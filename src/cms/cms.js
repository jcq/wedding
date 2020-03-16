import CMS from 'netlify-cms-app';
// import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import EventItemPreview from './preview-templates/EventItemPreview';
import FaqPagePreview from './preview-templates/FaqPagePreview';
import GetInvolvedPagePreview from './preview-templates/GetInvolvedPagePreview';
import RsvpPagePreview from './preview-templates/RsvpPagePreview';
import ShopPagePreview from './preview-templates/ShopPagePreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import CovidPagePreview from './preview-templates/CovidPagePreview';

import styles from '!css-loader!sass-loader!../components/all.scss';
import ThankYouPagePreview from './preview-templates/ThankYouPagePreview';

CMS.registerPreviewStyle(styles.toString(), { raw: true });

// CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('faq', FaqPagePreview);
CMS.registerPreviewTemplate('events', EventItemPreview);
CMS.registerPreviewTemplate('get-involved', GetInvolvedPagePreview);
CMS.registerPreviewTemplate('rsvp', RsvpPagePreview);
CMS.registerPreviewTemplate('thanks', ThankYouPagePreview);
CMS.registerPreviewTemplate('shop', ShopPagePreview);
CMS.registerPreviewTemplate('coronavirus', CovidPagePreview);
