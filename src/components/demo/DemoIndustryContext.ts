'use client'

import { createContext, useContext } from 'react';

export const DemoIndustryContext = createContext<string | undefined>(undefined);

export const useDemoIndustrySlug = () => useContext(DemoIndustryContext);
