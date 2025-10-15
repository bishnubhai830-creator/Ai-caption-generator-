export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const redirectRules = [
        { from: '/', to: '/index.html', status: 200 },
        { from: '/generator', to: '/generator.html', status: 301 },
        { from: '/blog', to: '/blog.html', status: 301 },
        { from: '/about', to: '/about.html', status: 301 },
        { from: '/contact', to: '/contact.html', status: 301 },
        { from: '/pricing', to: '/pricing.html', status: 301 },
        { from: '/privacy', to: '/privacy.html', status: 301 },
        { from: '/terms', to: '/terms.html', status: 301 },
        { from: '/top-10-free-ai-caption-generators', to: '/top-10-free-ai-caption-generators.html', status: 301 },
        { from: /^https:\/\/c0df4f92\.ai-caption-generator\.pages\.dev\/(.*)/, to: 'https://viralcap.ai/$1', status: 301 }
    ];
    for (const rule of redirectRules) {
        if (typeof rule.from === 'string') {
            if (url.pathname === rule.from) {
                return Response.redirect(rule.to, rule.status);
            }
        } else if (rule.from instanceof RegExp) {
            const match = url.href.match(rule.from);
            if (match) {
                const destination = rule.to.replace('$1', match[1] || '');
                return Response.redirect(destination, rule.status);
            }
        }
    }
    const validPages = [
        '/index.html',
        '/generator.html',
        '/blog.html',
        '/about.html',
        '/contact.html',
        '/pricing.html',
        '/privacy.html',
        '/terms.html',
        '/top-10-free-ai-caption-generators.html'
    ];
    if (!validPages.includes(url.pathname)) {
        return Response.redirect('/index.html', 301);
    }
    return next();
}
