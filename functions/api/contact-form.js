
export async function onRequestPost(context) {
    let input = await context.request.formData();

    const response = await fetch('https://formspree.io/f/xblgrwro', {
        method: 'POST',
        body: JSON.stringify({
            name: input.get('name'),
            email: input.get('email'),
            subject: input.get('subject'),
            message: input.get('message'),
        }),
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok) {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/success.html?redirect=/contact.html&msg=Wiadomosc zostala wyslana",
            },
        });
    } else {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/error.html?redirect=/contact.html&msg=Wiadomosc nie zostala wyslana",
            },
        });
    }

}