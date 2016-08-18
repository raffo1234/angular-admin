materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");


        $stateProvider

            //------------------------------
            // LOGIN
            //------------------------------



            //------------------------------
            // HOME
            //------------------------------

            .state ('home', {
                url: '/home',
                templateUrl: 'views/home.html'
            })

            //------------------------------
            // HEADERS
            //------------------------------
            .state ('headers', {
                url: '/headers',
                templateUrl: 'views/common-2.html'
            })

            .state('headers.textual-menu', {
                url: '/textual-menu',
                templateUrl: 'views/textual-menu.html'
            })

            .state('headers.image-logo', {
                url: '/image-logo',
                templateUrl: 'views/image-logo.html'
            })

            .state('headers.mainmenu-on-top', {
                url: '/mainmenu-on-top',
                templateUrl: 'views/mainmenu-on-top.html'
            })



            //------------------------------
            // MENSAJES
            //------------------------------

            .state ('mensajes', {
                url: '/mensajes',
                templateUrl: 'views/common-2.html'
            })
            .state ('mensajes.mensajes', {
                url: '/mensajes/:lang',
                templateUrl: 'views/mensajes.html'
            })
            .state ('mensajes.editar', {
                url: '/editar/:lang/:id',
                templateUrl: 'views/mensaje-editar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [                                    
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'                                    
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/fileinput/fileinput.min.js'
                                    
                                ]
                            }
                        ])
                    }
                }
            })



            //------------------------------
            // NOTICIAS
            //------------------------------

            .state ('noticias', {
                url: '/noticias',
                templateUrl: 'views/common-2.html'
            })
            .state ('noticias.noticias', {
                url: '/noticia/:lang',
                templateUrl: 'views/noticias.html'
            })
            .state ('noticias.editar', {
                url: '/editar/:lang/:id',
                templateUrl: 'views/noticia-editar.html'
            })


            //------------------------------
            // HISTORIA
            //------------------------------

            .state ('historia', {
                url: '/historia',
                templateUrl: 'views/common-2.html'
            })
            .state ('historia.historia', {
                url: '/historia/:lang',
                templateUrl: 'views/historia.html'
            })
            .state ('historia.editar', {
                url: '/editar/:lang/:id',
                templateUrl: 'views/historia-editar.html'
            })


            //------------------------------
            // PERSONAS
            //------------------------------

            .state ('personas', {
                url: '/personas',
                templateUrl: 'views/common-2.html'
            })
            .state ('personas.personas', {
                url: '/personas/:lang',
                templateUrl: 'views/personas.html'
            })
            .state ('personas.editar', {
                url: '/editar/:lang/:id',
                templateUrl: 'views/persona-editar.html'
            })




            //------------------------------
            // LUGARES
            //------------------------------

            .state ('lugares', {
                url: '/lugares',
                templateUrl: 'views/common-2.html'
            })
            .state ('lugares.lugares', {
                url: '/lugares/:lang',
                templateUrl: 'views/lugares.html'
            })
            .state ('lugares.editar', {
                url: '/editar/:lang/:id',
                templateUrl: 'views/lugar-editar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [                                    
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'                                    
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/fileinput/fileinput.min.js'
                                    
                                ]
                            }
                        ])
                    }
                }
            })

            


        
    });
