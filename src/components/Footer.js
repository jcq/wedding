import React from 'react';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div className="columns is-centered is-mobile">
              <div className="column  is-one-third-desktop is-half ">
                <div className="disclaimer">Paid for by Miraglia / Quirin 2020</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
