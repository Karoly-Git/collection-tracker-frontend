import "./Footer.scss";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <span className="footer__text">
                    © {year} Collection Tracker
                </span>

                <span className="footer__version">
                    v1.0.0
                </span>
            </div>
        </footer>
    );
}