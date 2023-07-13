const authConfig = {
  onSignIn: async (user) => {
    alert('You just signed in, congratz! Check out the console!');
    console.log(user);
    window.location.hash = '';
  },
    authority: 'http://localhost:8080', //Replace with your issuer URL
    clientId: '219816896776699907@cloudroll', //Replace with your client id
    redirectUri: 'http://localhost:3000/',
    responseType: 'code',
    scope: 'openid profile email urn:zitadel:iam:org:id:219807134752178179',
    
  };

 export default authConfig;
