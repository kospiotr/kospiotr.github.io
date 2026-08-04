---
layout: post
title:  "UI Binder GWT Styles"
description: "Synchronous injection of Styles to UI Binder"
date:   2013-06-12 22:16:00
---
Often when using UI Binder in your GWT project you would like to stylize your app with CSS. There are two ways of doing this a) by adding CSS attribute directly in DOM element or b) by using Client Bundle.

#Add CSS attribute

Please check reference guide: [https://developers.google.com/web-toolkit/doc/latest/DevGuideUiCss](https://developers.google.com/web-toolkit/doc/latest/DevGuideUiCss)

To add class attribute to any GWT element you need to use DOM static helper method. For example:

```java
Button b = new Button();
DOM.setElementAttribute(b.getElement(), "id", "my-button-id")
```

Then in CSS file that you must add to the hosted page:

```css
#my-button-id { 
	font-size: 100%; 
}
```

Although it works it has some disadvantages. Lets talk now about another option.

#Client Bundle

Please check reference guide: [https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#CssResource](https://developers.google.com/web-toolkit/doc/latest/DevGuideClientBundle#CssResource)

Let’s define CSS file in project as resource without attaching it to the hosted page:

`MyStyle.css`:

```css
.innerLayout {
	background-color: black;
}
```

Lets define it’s interface:

`MyStyle.java`:

```java
interface MyStyle extends CssResource {
	String innerLayout();
}
```

And resources that contains styles:

```java
interface MyResources extends ClientBundle {
	@ClientBundle.Source(value = "MyStyle.css")
	MyStyle style();
}
```

Now we can use it in our application:

```java
Style style = GWT.<Resources> create(MyResources.class).style();
```

Very often we want to use style immediately so we must assure that styles are already injected to the application:

```java
StyleInjector.inject(style.getText(), true);
```

What can can we do now with such style name? We can use it as in the previous example or it can be passed to UI Binder:

`MyWidget.java`:

```xml
<ui:UiBinder xmlns:ui="urn:ui:com.google.gwt.uibinder" xmlns:g='urn:import:com.google.gwt.user.client.ui'>
	<ui:with field='style' type='....Style' />
	<g:HTMLPanel>
		<div class="{style.innerLayout}">Text</div>
	</g:HTMLPanel>
</ui:UiBinder>
```

There is much more effort using Client Bundle approach so why it’s better way? It depends what do you mean by better, but this allows you to according to the guide for:

 * Validate CSS during compilation
 * Mimific and optimize output
 * Leverage GWT compiler
  * Different CSS for different browsers, automatically
  * Static evaluation of content
 * Basic CSS Modularization
  * Via dependency-injection API style
  * Widgets can inject their own CSS only when it’s needed
 * BiDi (Janus-style?)
 * CSS image strips
 * “Improve CSS”
  * Constants
  * Simple expressions
 * Runtime manipulation (StyleElement.setEnabled() handles many cases)
 * Compile-time class-name checking (Java/CSS)
 * Obfuscation
 * Also when developing big project this allows to to keep resources clean and in right place.

#References

 * [http://www.gwtproject.org/doc/latest/DevGuideClientBundle.html](http://www.gwtproject.org/doc/latest/DevGuideClientBundle.html)
 * [https://code.google.com/p/google-web-toolkit/wiki/CssResource](https://code.google.com/p/google-web-toolkit/wiki/CssResource)
 * [https://plus.google.com/u/0/+StefanoPulze/posts/HEnf4qqChB7?cfem=1](https://plus.google.com/u/0/+StefanoPulze/posts/HEnf4qqChB7?cfem=1)