import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      Built with <a href="https://contentful.com/">Contentful</a>
    </div>
  </Container>
)

export default Footer
