---
layout: wiki
title: Tools
comments: false
toc: false
editurl: tools/index.md
---

<ul>
	{% for page in site.pages %}
		{% if page.layout == 'tool' %}
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

