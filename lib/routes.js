FlowRouter.route( '/', {
  action: function() {
    BlazeLayout.render( 'appLayout', { main: 'dashboard' } ); 
  },
  name: 'dashboard'
});

FlowRouter.route( '/add-recipe', {
  action: function() {
    BlazeLayout.render( 'appLayout', { main: 'addRecipe' } ); 
  },
  name: 'recipe'
});



// FlowRouter.route( '/', {
//   action: function() {
//     BlazeLayout.render( 'appLayout', { 
//       header: 'appHeader',
//       sidebar: 'appSideNav',
//       main: 'dashboard',
//       footer: 'appFooter'
//     }); 
//   },
//   name: 'dashboard'
// });

// FlowRouter.route( '/add-recipe', {
//   action: function() {
//     BlazeLayout.render( 'appLayout', { 
//       header: 'appHeader',
//       sidebar: 'appSideNav',
//       main: 'addRecipe',
//       footer: 'appFooter'
//     }); 
//   },
//   name: 'recipe'
// });