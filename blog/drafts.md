---
layout: page
title: Post drafts
comments: false
---
<div class="posts">

{% for post in site.posts %}
	{% if post.draft == true %}
	<article class="post-list">
		<header>
			<span class="post-title">
				<a href="{{ post.url }}">{{ post.title }}</a>
			</span>
			<time class="post-time" datetime="{{ post.date }}" data-updated="true">{{ post.date | date_to_string }}</time>
		</header>
		<p class="post-description">{{ post.description }}</p>
	</article>
	{% endif %}
{% endfor %}
</div>
