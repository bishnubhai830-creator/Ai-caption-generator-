export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);

    const redirectRules = [
        { from: '/', to: '/index.html', status: 200 },
        { from: '/generator', to: '/generator.html', status: 301 },
        { from: '/blog', to: '/blog.html', status: 301 },
        { from: '/old-page', to: '/generator.html', status: 301 },
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

    if (!['/index.html', '/generator.html', '/blog.html'].includes(url.pathname)) {
        const response = await fetch(new URL('/index.html', url.origin), request);
        if (!response.ok) {
            return new Response('Page Not Found', { status: 404 });
        }
        return response;
    }

    return next();
}
