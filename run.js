var lasso = require('lasso');
var fs = require('fs');
var mustache = require('mustache');

lasso.configure({
    'plugins': [
        'lasso-less'
    ],
    'urlPrefix': 'static/',
    'outputDir': 'static',
    'fingerprintsEnabled': true,
    'minify': false,
    'resolveCssUrls': true,
    'bundlingEnabled': true,
    'bundles': [
        {
            'name': 'jquery',
            'dependencies': [
                'require: jquery'
            ]
        },
        {
            'name': 'math',
            'dependencies': [
                'require: ./add'
            ]
        }
    ]
});


lasso.lassoPage({
        name: 'my-page',
        dependencies: [
            'style.less',
            'require-run: ./main'
        ]
    }, function(err, result) {
        var mustacheSource = fs.readFileSync('my-page.mustache', 'utf8');

        var html = mustache.render(mustacheSource, {
            lassoHead: result.getHeadHtml(),
            lassoBody: result.getBodyHtml()
        });

        fs.writeFileSync('my-page.html', html, 'utf8');

        console.log('HTML page successfully written to "my-page.html"!');
    });
