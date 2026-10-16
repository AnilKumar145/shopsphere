import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../layouts/ProtectedRoute';
import * as AuthContextModule from '../context/AuthContext';

describe('ProtectedRoute navigation guard (Unit 8.7, 11.5, 14.7)', () => {
  it('redirects unauthenticated user to login route', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      user: null,
      session: null,
      isLoading: false,
      error: null,
      login: vi.fn(),
      demoQuickLogin: vi.fn(),
      logout: vi.fn(),
      updateUserPreferences: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <div>Private Account Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Private Account Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page Target')).toBeInTheDocument();
  });

  it('renders protected child component when user is authenticated', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'johnd',
        email: 'john@gmail.com',
        name: { firstname: 'John', lastname: 'Doe' },
        phone: '123',
        role: 'customer',
      },
      session: {
        token: 'token-123',
        user: {
          id: 1,
          username: 'johnd',
          email: 'john@gmail.com',
          name: { firstname: 'John', lastname: 'Doe' },
          phone: '123',
          role: 'customer',
        },
        expiresAt: Date.now() + 10000,
      },
      isLoading: false,
      error: null,
      login: vi.fn(),
      demoQuickLogin: vi.fn(),
      logout: vi.fn(),
      updateUserPreferences: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <div>Private Account Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Account Content')).toBeInTheDocument();
  });
});
