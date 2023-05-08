import '@/styles/globals.css';
import type { Metadata } from 'next';
import QueryProvider from './query-provider';

export const metadata: Metadata = {
    title: 'DM Bot',
    viewport: 'width=device-width, initial-scale=1',
    description: 'An AI assisted DM tool'
};

export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}