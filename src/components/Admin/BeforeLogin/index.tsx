import React from 'react'

const stylesBeforeLogin = {
  container: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '1.3',
  },
  description: {
    fontSize: '16px',
  },
}

const BeforeLogin: React.FC = () => {
  return (
    // @ts-expect-error eslint-disable-line
    <div style={stylesBeforeLogin.container}>
      <p style={stylesBeforeLogin.title}>
        <b>{"Bienvenue sur votre espace d'administration de votre site !"}</b>
        <br />
        <span style={stylesBeforeLogin.description}>
          {' Cet espace est réservé aux administrateurs du site.'}
        </span>
      </p>
    </div>
  )
}

export default BeforeLogin
