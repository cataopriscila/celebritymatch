import React from 'react';

const Footer = () => {
    return (
        <footer className="pv4 ph3 ph5-m ph6-l">
            <h4 className="f6 db tc">© 2021 <b className="ttu">Celebrity Match</b>. All Rights Reserved</h4>
            <div className="tc mt2">
                <a href="/language/" title="Language" className="f6 dib ph2 link black dim">Language</a>
                <a href="/terms/"    title="Terms" className="f6 dib ph2 link black dim">Terms of Use</a>
                <a href="/privacy/"  title="Privacy" className="f6 dib ph2 link black dim">Privacy</a>
            </div>
</footer>
    );
}

export default Footer;
