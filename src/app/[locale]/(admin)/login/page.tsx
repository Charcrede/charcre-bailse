'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await authService.login(); // Google sign-in
            router.push('/en/admin');
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-tr from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-sm shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Connectez-vous</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {error && <p className="text-destructive text-center">{error}</p>}

                    <Button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold rounded-xl shadow hover:scale-105 transition-transform"
                        disabled={loading}
                    >
                        <FcGoogle size={24} />
                        {loading ? 'Connexion...' : 'Se connecter avec Google'}
                    </Button>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Vous serez redirigé vers votre espace admin après connexion.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
