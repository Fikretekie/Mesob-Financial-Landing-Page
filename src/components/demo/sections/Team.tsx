'use client'

import { useEffect, useState } from 'react';
import { Users, UserPlus, Calculator, User, Eye, X, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Preview of the planned "add an accountant / user" feature. Invites live in
// the visitor's browser only — the demo never sends an email.
type Role = 'accountant' | 'member' | 'viewer';

interface Invite {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const MAX_DEMO_INVITES = 2;
const ROLE_ICONS = { accountant: Calculator, member: User, viewer: Eye };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface TeamProps {
  storageKey: string;
  ownerName: string;
  onLimit: () => void;
  onInvited: (role: Role) => void;
}

export function Team({ storageKey, ownerName, onLimit, onInvited }: TeamProps) {
  const { t } = useTranslation();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('accountant');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setInvites(JSON.parse(localStorage.getItem(storageKey) || '[]'));
    } catch {
      setInvites([]);
    }
  }, [storageKey]);

  const save = (next: Invite[]) => {
    setInvites(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage blocked — the list still works for this visit.
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !EMAIL.test(email.trim())) {
      setError(t('demo.team.invalid'));
      return;
    }
    if (invites.length >= MAX_DEMO_INVITES) {
      onLimit();
      return;
    }
    setError('');
    save([...invites, { id: `i${Date.now()}`, name: name.trim(), email: email.trim(), role }]);
    onInvited(role);
    setName('');
    setEmail('');
  };

  const roles: Role[] = ['accountant', 'member', 'viewer'];

  return (
    <div className="dm-stack">
      <header className="dash-overview">
        <div className="dash-overview__main">
          <span className="mk-badge mk-badge--info">{t('demo.team.new')}</span>
          <h1 className="dash-overview__title" style={{ marginTop: 10 }}>{t('demo.team.title')}</h1>
          <p className="dash-overview__sub">{t('demo.team.subtitle')}</p>
        </div>
      </header>

      <div className="dm-grid dm-grid--half">
        <section className="mk-card">
          <div className="dash-panel-head">
            <span className="mk-chip mk-chip--sm" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}><Users aria-hidden /></span>
            <span className="mk-eyebrow">{t('demo.team.members')}</span>
          </div>

          <div className="dash-tx">
            <span className="dm-account__avatar" aria-hidden><Crown style={{ width: 14, height: 14 }} /></span>
            <div className="dash-tx__main">
              <div className="dash-tx__nm">{ownerName}</div>
              <div className="dash-tx__sub">{t('demo.team.you')}</div>
            </div>
            <span className="mk-badge mk-badge--info" style={{ marginInlineStart: 'auto' }}>{t('demo.team.roleOwner')}</span>
          </div>

          {invites.map((invite) => {
            const Icon = ROLE_ICONS[invite.role];
            return (
              <div className="dash-tx" key={invite.id}>
                <span className="mk-chip mk-chip--sm" style={{ background: 'var(--surface-3)', color: 'var(--text-2)' }}><Icon aria-hidden /></span>
                <div className="dash-tx__main">
                  <div className="dash-tx__nm">{invite.name}</div>
                  <div className="dash-tx__sub" style={{ textTransform: 'none' }}>{invite.email}</div>
                </div>
                <div style={{ marginInlineStart: 'auto', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span className="mk-badge">{t(`demo.team.role_${invite.role}`)}</span>
                  <span className="mk-badge mk-badge--warn">{t('demo.team.pending')}</span>
                  <button
                    type="button"
                    className="dm-biz__remove"
                    aria-label={t('demo.team.remove', { name: invite.name })}
                    onClick={() => save(invites.filter((i) => i.id !== invite.id))}
                  >
                    <X aria-hidden />
                  </button>
                </div>
              </div>
            );
          })}
          {invites.length === 0 && <div className="dash-empty">{t('demo.team.empty')}</div>}
        </section>

        <section className="mk-card">
          <div className="dash-panel-head">
            <span className="mk-chip mk-chip--sm" style={{ background: 'rgba(0,217,126,0.14)', color: 'var(--green)' }}><UserPlus aria-hidden /></span>
            <span className="mk-eyebrow">{t('demo.team.inviteTitle')}</span>
          </div>
          <form className="dm-stack" style={{ gap: 14 }} onSubmit={submit} noValidate>
            {error && <div className="dm-locked" role="alert" style={{ borderColor: 'rgba(255,77,77,0.45)', background: 'var(--danger-soft)' }}>{error}</div>}
            <div className="dm-form-grid">
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-team-name">{t('demo.team.name')}</label>
                <input id="dm-team-name" className="dm-input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
              </div>
              <div className="dm-field">
                <label className="dm-label" htmlFor="dm-team-email">{t('demo.team.email')}</label>
                <input id="dm-team-email" type="email" className="dm-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
              </div>
            </div>
            <div className="dm-field">
              <span className="dm-label">{t('demo.team.role')}</span>
              <div className="dm-roles" role="radiogroup" aria-label={t('demo.team.role')}>
                {roles.map((r) => {
                  const Icon = ROLE_ICONS[r];
                  return (
                    <button
                      key={r}
                      type="button"
                      role="radio"
                      aria-checked={role === r}
                      className={`dm-role${role === r ? ' is-selected' : ''}`}
                      onClick={() => setRole(r)}
                    >
                      <Icon aria-hidden />
                      <span className="dm-role__name">{t(`demo.team.role_${r}`)}</span>
                      <span className="dm-role__desc">{t(`demo.team.desc_${r}`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <button type="submit" className="mk-btn mk-btn--primary dm-save">{t('demo.team.send')}</button>
            <p className="dm-modal__sub" style={{ textAlign: 'center' }}>{t('demo.team.demoNote', { count: MAX_DEMO_INVITES })}</p>
          </form>
        </section>
      </div>
    </div>
  );
}
