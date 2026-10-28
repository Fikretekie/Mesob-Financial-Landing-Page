'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@/components/demo/ui/dialog';

// Mirrors app.meksova.com's Team page (src/views/Team.js): owner row, teammates
// with role / status / business access / permissions, edit + remove, the
// activity card, and the add-user form with the seat note (first teammate
// free, then $9.99/month each). Teammates live in this browser only — the demo
// never creates a login or charges anyone.

type Role = 'accountant' | 'member' | 'viewer';
type Perms = { add: boolean; edit: boolean; delete: boolean };

interface Member {
  id: string;
  email: string;
  role: Role;
  status: 'invited' | 'active';
  createdAt: string;
  businessIds: string[];
  perms: Perms;
}

export interface BusinessOption {
  id: string;
  name: string;
}

const MAX_DEMO_INVITES = 2;
const ROLES: Role[] = ['accountant', 'member', 'viewer'];
const DEFAULT_PERMS: Perms = { add: true, edit: true, delete: false };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initials = (s: string) =>
  (s || '?').trim().split(/[@\s.]+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const fmtDate = (s: string) => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const generatePassword = () => {
  const sets = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnpqrstuvwxyz', '23456789', '!@#$%*?'];
  const all = sets.join('');
  const rnd = (s: string) => s[Math.floor(Math.random() * s.length)];
  const out = sets.map(rnd);
  for (let i = out.length; i < 12; i++) out.push(rnd(all));
  return out.sort(() => Math.random() - 0.5).join('');
};

interface TeamProps {
  storageKey: string;
  ownerName: string;
  businesses: BusinessOption[];
  onLimit: () => void;
  onInvited: (role: Role) => void;
}

export function Team({ storageKey, ownerName, businesses, onLimit, onInvited }: TeamProps) {
  const { t } = useTranslation();
  const tt = (key: string, opts?: Record<string, unknown>) => t(`demo.teamApp.${key}`, opts);
  const [members, setMembers] = useState<Member[]>([]);

  // Add / edit form state
  const [showInvite, setShowInvite] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<Role>('accountant');
  const [bizIds, setBizIds] = useState<string[]>([]);
  const [perms, setPerms] = useState<Perms>({ ...DEFAULT_PERMS });
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      // Older demo invites ({name,email,role}) are upgraded to the app's shape.
      setMembers(
        (Array.isArray(stored) ? stored : []).map((m: Partial<Member> & { name?: string }) => ({
          id: m.id || `m${Math.random().toString(36).slice(2)}`,
          email: m.email || m.name || '',
          role: (m.role as Role) || 'member',
          status: m.status || 'invited',
          createdAt: m.createdAt || new Date().toISOString(),
          businessIds: m.businessIds || [],
          perms: m.perms || { ...DEFAULT_PERMS },
        })),
      );
    } catch {
      setMembers([]);
    }
  }, [storageKey]);

  const save = (next: Member[]) => {
    setMembers(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage blocked — the list still works for this visit.
    }
  };

  const allBizIds = businesses.map((b) => b.id);
  const permSummary = (p?: Perms) => {
    const on = (['add', 'edit', 'delete'] as const).filter((k) => p?.[k]).map((k) => tt(`perm_${k}`));
    return on.length ? on.join(', ') : tt('viewOnly');
  };
  const bizNames = (ids: string[]) => ids.map((id) => businesses.find((b) => b.id === id)?.name).filter(Boolean).join(', ');
  const toggleId = (arr: string[], id: string) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const resetForm = () => {
    setShowInvite(false);
    setEditing(null);
    setEmail('');
    setPassword('');
    setShowPw(false);
    setRole('accountant');
    setBizIds(allBizIds);
    setPerms({ ...DEFAULT_PERMS });
    setError('');
  };

  const openInvite = () => {
    if (members.length >= MAX_DEMO_INVITES) {
      onLimit();
      return;
    }
    resetForm();
    setShowInvite(true);
  };

  const openEdit = (m: Member) => {
    resetForm();
    setEditing(m);
    setRole(m.role);
    setBizIds(m.businessIds.length ? m.businessIds : allBizIds);
    setPerms({ ...m.perms });
  };

  const handleInvite = () => {
    if (!EMAIL.test(email.trim())) return setError(tt('invalidEmail'));
    if (password.length < 8) return setError(tt('passwordShort'));
    if (businesses.length > 1 && bizIds.length === 0) return setError(tt('selectBusiness'));
    if (members.some((m) => m.email.toLowerCase() === email.trim().toLowerCase())) return setError(tt('emailTaken'));
    save([
      ...members,
      {
        id: `m${Date.now()}`,
        email: email.trim().toLowerCase(),
        role,
        status: 'invited',
        createdAt: new Date().toISOString(),
        businessIds: businesses.length > 1 ? bizIds : [],
        perms,
      },
    ]);
    onInvited(role);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    if (businesses.length > 1 && bizIds.length === 0) return setError(tt('selectBusiness'));
    save(members.map((m) => (m.id === editing.id ? { ...m, role, perms, businessIds: businesses.length > 1 ? bizIds : [] } : m)));
    resetForm();
  };

  // Same billing rule as the app: the first teammate is free, the 2nd+ is paid.
  const paidSeat = members.length >= 1;
  const formOpen = showInvite || !!editing;

  const roleSelect = (
    <div className="dm-modal__group">
      <label className="dm-label" htmlFor="dm-team-role">{tt('roleLabel')}</label>
      <select id="dm-team-role" className="dm-input" value={role} onChange={(e) => setRole(e.target.value as Role)}>
        {ROLES.map((r) => (
          <option key={r} value={r}>{tt(`role${r.charAt(0).toUpperCase()}${r.slice(1)}`)}</option>
        ))}
      </select>
      <small className="team-role-hint">{tt('roleHint')}</small>
    </div>
  );

  const accessAndPerms = (
    <>
      {businesses.length > 1 && (
        <div className="dm-modal__group">
          <span className="dm-label">{tt('businessAccess')}</span>
          <div className="team-biz-list">
            {businesses.map((b) => (
              <label key={b.id || 'default'} className="team-biz-item">
                <input type="checkbox" checked={bizIds.includes(b.id)} onChange={() => setBizIds((a) => toggleId(a, b.id))} />
                <span>{b.name}</span>
              </label>
            ))}
          </div>
          <small className="team-role-hint">{tt('businessAccessHint')}</small>
        </div>
      )}
      <div className="dm-modal__group">
        <span className="dm-label">{tt('permissions')}</span>
        <div className="team-biz-list">
          {(['add', 'edit', 'delete'] as const).map((k) => (
            <label key={k} className="team-biz-item">
              <input type="checkbox" checked={perms[k]} onChange={() => setPerms((p) => ({ ...p, [k]: !p[k] }))} />
              <span>{tt(`perm_${k}`)}</span>
            </label>
          ))}
        </div>
        <small className="team-role-hint">{tt('permsHint')}</small>
      </div>
    </>
  );

  return (
    <div className="dm-stack team-wrap">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <h1 className="dash-overview__title">{tt('title')}</h1>
          <p className="dash-overview__sub">{tt('subtitle')}</p>
        </div>
        <div className="dash-overview__side">
          <button type="button" className="team-invite-btn" onClick={openInvite}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            {tt('invite')}
          </button>
        </div>
      </header>

      <div className="team-card">
        <div className="team-row">
          <div className="team-ava team-ava--owner">{initials(ownerName || 'You')}</div>
          <div className="team-row__main">
            <span className="team-row__email">{ownerName}</span>
            <span className="team-row__meta">{tt('you')}</span>
          </div>
          <span className="team-chip team-chip--owner">{tt('roleOwner')}</span>
        </div>

        {members.length === 0 ? (
          <div className="team-empty">
            <p className="team-empty__title">{tt('emptyTitle')}</p>
            <p className="team-empty__sub">{tt('emptySub')}</p>
          </div>
        ) : (
          members.map((m) => (
            <div className="team-row" key={m.id}>
              <div className="team-ava">{initials(m.email)}</div>
              <div className="team-row__main">
                <span className="team-row__email">{m.email}</span>
                <span className="team-row__meta">
                  {tt(`role${m.role.charAt(0).toUpperCase()}${m.role.slice(1)}`)} ·{' '}
                  <span className={m.status === 'active' ? 'team-status--active' : 'team-status--pending'}>
                    {m.status === 'active' ? tt('active') : tt('invited')}
                  </span>
                  {` · ${tt('added')} ${fmtDate(m.createdAt)}`}
                  {businesses.length > 1 && m.businessIds.length > 0 && m.businessIds.length < businesses.length ? ` · ${bizNames(m.businessIds)}` : ''}
                  {` · ${permSummary(m.perms)}`}
                </span>
              </div>
              <div className="team-row__actions">
                <button type="button" className="team-edit" title={tt('edit')} aria-label={`${tt('edit')} ${m.email}`} onClick={() => openEdit(m)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                  </svg>
                </button>
                <button type="button" className="team-remove" title={tt('remove')} aria-label={`${tt('remove')} ${m.email}`} onClick={() => save(members.filter((x) => x.id !== m.id))}>
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="team-card team-log">
        <div className="team-log__head">{tt('activity')}</div>
        <div className="team-empty">
          <p className="team-empty__sub">{tt('activityEmpty')}</p>
        </div>
      </div>

      <p className="dm-modal__sub" style={{ textAlign: 'center' }}>{t('demo.team.demoNote', { count: MAX_DEMO_INVITES })}</p>

      <Dialog open={formOpen} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent aria-describedby={undefined}>
          <div className="dm-modal__head">
            <DialogTitle className="dm-modal__title">{editing ? tt('editTitle') : tt('inviteTitle')}</DialogTitle>
            <p className="dm-modal__sub">{editing ? editing.email : tt('inviteSub')}</p>
          </div>
          <div className="dm-modal__body">
            {error && <div className="team-seat-note team-seat-note--warn" role="alert">{error}</div>}
            {!editing && <div className="team-seat-note">{paidSeat ? tt('seatNote') : tt('firstFree')}</div>}

            {!editing && (
              <>
                <div className="dm-modal__group">
                  <label className="dm-label" htmlFor="dm-team-email">{tt('emailLabel')}</label>
                  <input id="dm-team-email" type="email" className="dm-input" value={email} placeholder={tt('emailPlaceholder')} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                </div>
                <div className="dm-modal__group">
                  <label className="dm-label" htmlFor="dm-team-pw">{tt('passwordLabel')}</label>
                  <div className="team-pw-row">
                    <input
                      id="dm-team-pw"
                      className="dm-input"
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      placeholder={tt('passwordPlaceholder')}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button type="button" className="team-pw-btn" onClick={() => setShowPw((s) => !s)}>{showPw ? tt('hide') : tt('show')}</button>
                    <button type="button" className="team-pw-btn team-pw-btn--gen" onClick={() => { setPassword(generatePassword()); setShowPw(true); }}>{tt('generate')}</button>
                  </div>
                  <small className="team-role-hint">{tt('passwordHint')}</small>
                </div>
              </>
            )}

            {roleSelect}
            {accessAndPerms}

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="mk-btn mk-btn--ghost" onClick={resetForm} style={{ flex: '0 0 auto' }}>{tt('cancel')}</button>
              <button type="button" className="mk-btn mk-btn--primary dm-save" onClick={editing ? handleSaveEdit : handleInvite}>
                {editing ? tt('save') : tt('sendInvite')}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
