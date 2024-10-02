import { describe, it, expect } from 'vitest';
import Home from "../view/Home.tsx";
import {screen, render, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            {
                id: '1',
                name: 'test1.1',
                firstname: 'test1.2',
                isPresent: true
            },
            {
                id: '2',
                name: 'test2.1',
                firstname: 'test2.2',
                isPresent: true
            }
        ]),
    })
);

describe('fetchData avec MSW', () => {

    it('doit afficjer la liste des VIPs', async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/test1.1/i)).toBeInTheDocument();
            expect(screen.getByText(/test2.1/i)).toBeInTheDocument();
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
