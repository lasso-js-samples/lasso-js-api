var lasso = require('lasso');
var fs = require('fs');
var path = require('path');
var mustache = require('mustache');

lasso.configure({
    'plugins': [
        'lasso-less'
    ],
    'urlPrefix': '/static',
    'outputDir': path.join(__dirname, 'build/static'),
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
                'require: ./src/add'
            ]
        }
    ]
});


lasso.lassoPage({
        name: 'my-page',
        dependencies: [
            path.join(__dirname, 'src/browser.json')
        ]
    }, function(err, result) {
        if (err) {
            throw err;
        }

        var templatePath = path.join(__dirname, 'src/index.mustache');

        var mustacheSource = fs.readFileSync(templatePath, {encoding: 'utf8'});

        var html = mustache.render(mustacheSource, {
            lassoHead: result.getHeadHtml(),
            lassoBody: result.getBodyHtml()
        });

        var buildDir = path.join(__dirname, 'build');

        try {
            fs.mkdirSync(buildDir);
        } catch(e) {}

        var outputHtmlFile = path.join(buildDir, 'index.html');

        fs.writeFileSync(outputHtmlFile, html, {encoding: 'utf8'});

        console.log(`HTML page successfully written to "${outputHtmlFile}"!`);
    });