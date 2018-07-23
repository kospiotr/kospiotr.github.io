---
layout: wiki
title: Dev
comments: false
toc: false
editurl: dev/index.md
---

<ul>
	{% for page in site.pages %}
		{% if page.layout == 'dev' %}
    		<li>
    			<a href="{{ page.url }}">{{ page.title }}</a>
    			{% if page.description %}
    				 -
				{% endif %}
    			{{ page.description }}
    		</li>
		{% endif %}
	{% endfor %}
</ul>
