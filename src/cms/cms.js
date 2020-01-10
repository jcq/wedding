import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import EventsPagePreview from './preview-templates/EventsPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import GetInvolvedPagePreview from './preview-templates/GetInvolvedPagePreview'
import RsvpPagePreview from './preview-templates/RsvpPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import styles from '!css-loader!sass-loader!../components/all.scss'

CMS.registerPreviewStyle(styles.toString(), { raw: true })

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('faq', FaqPagePreview)
CMS.registerPreviewTemplate('events', EventsPagePreview)
CMS.registerPreviewTemplate('get-involved', GetInvolvedPagePreview)
CMS.registerPreviewTemplate('rsvp', RsvpPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
