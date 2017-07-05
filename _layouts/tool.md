---
layout: default
comments: false
---

<article id="main-article">
    <header id="header">
        <h1 id="page-title">{{ %page.title% }}</h1>

        {% if page.description %}
        <h2 id="page-description">
            {{ %page.description% }}
        </h2>
        {% endif %}
    </header>

    <div id="article-body" class="markdown-body">
        {{ content }}
    </div>

</article>
