export interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: 'Poster' | 'Reel' | 'Website';
  imageUrl: string;
  url?: string;
  createdAt: string;
}

const STORAGE_KEY = 'pm_portfolio_works';

export function getWorks(): WorkItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWork(item: Omit<WorkItem, 'id' | 'createdAt'>): WorkItem {
  const works = getWorks();
  const newItem: WorkItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  works.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
  return newItem;
}

export function updateWork(id: string, updates: Partial<Omit<WorkItem, 'id' | 'createdAt'>>): void {
  const works = getWorks();
  const idx = works.findIndex((w) => w.id === id);
  if (idx !== -1) {
    works[idx] = { ...works[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
  }
}

export function deleteWork(id: string): void {
  const works = getWorks().filter((w) => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('pm_admin_session') === 'true';
}

export function adminLogin(email: string, password: string): boolean {
  if (
    email === 'praveenmanthiramoorthi@gmail.com' &&
    password.length >= 6
  ) {
    localStorage.setItem('pm_admin_session', 'true');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem('pm_admin_session');
}
