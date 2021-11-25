import Footer from './Footer';
import Navbar from './Navbar/Navbar';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="relative">
            <Navbar />
            <div className="min-h-[calc(100vh-64px-64px)] py-4">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;