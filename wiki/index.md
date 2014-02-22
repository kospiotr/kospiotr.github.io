---
layout: page
title: Wiki index
comments: false
toc: false
---

<ul>
	{% for page in site.pages %}
		{% if page.layout == 'wiki' %}
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
