export function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-[#1e262f] text-center text-sm text-muted-foreground bg-linear-to-r from-[#07233b] to-[#050d17]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Mon Portfolio. Tout droits réservés.</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
