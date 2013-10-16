jQuery Valideasy 
================

Never write complex JS script again to handle your form validation rules! With Valideasy, everything's done via HTML attributes added to your form fields.

**License:** GPL   
**Support:** All modern browsers, IE7+  

### Features
- Easy to use
- (almost) No JS code required
- Several validation rules supported : email, phone, html...
- Customizable error messages

## Table of Contents

- [Setup](#setup)

# Setup

- Load latest [jQuery](http://code.jquery.com/jquery-2.0.3.min.js) library
- Load `js/jquery-valideasy.min.js`
- Instantiate Valideasy on your form :

```javascript
$('form').submit(function(){
    var formIsValid = $(this).valideasy( {options} );
    return formIsValid;
});
```

[![TOC](http://i.imgur.com/RDbarNr.png)](#table-of-contents)

## Options

```javascript
defaults = {
  mode: 'single',
  errorElementId: 'errors',
  disableFieldStyle: false,
  stepByStep: false,
  scrollToFirstError: false,
}
```

### mode
How error messages are displayed.
- **single:** each message is located near its field
- **unified:** all messages at the same place, one at a time

### errorElementId
Indicates the ID of the field(s) supposed to display error messages.
- in **single** mode, the error message will be inserted in the element with ID {field_id}_{errorElementId}. For example: name_errors
- in **unified** mode, all the error messages will be inserted in the same element, with specified ID {errorElementId}.

### disableFieldStyle
Set to true to stop adding the .error class to fields with errors

### stepByStep
Set to true to stop validation at first error

### scrollToFirstError
Set to true to auto scroll to the first error field at the end of the validation process

[![TOC](http://i.imgur.com/RDbarNr.png)](#table-of-contents)

## Markup

- Validation rules are specified in the class attribute of the field
- Default value of the field must be specified both in the value attribute and in the title attribute
- In **single** mode, an element with the ID `{fieldId}_{errorElementId}` and class `.error-wrapper` should be placed somewhere in the page. Any error message triggered by this field will be inserted in that element.
- In **unified** mode, an element with the ID `{errorElementId}` and class `.error-wrapper` should be placed somewhere in the page. The first error message triggered by a field in the form will be placed in that element.

```html
<form novalidate action="/" method="post">

  <input class="{rules}" id="name" title="Name" type="text" value="Name" />
  <p id="name_errors" class="error-wrapper"></p>
  
</form>
```

## Rules

### Required

```html
  <input class="required" id="name" title="Name" type="text" value="Name" />
  
  <select class="required" id="gender" title="Select...">
    <option selected="selected" value="0">Select…</option>
    <option value="monsieur">Mr.</option>
    <option value="madame">Mrs.</option>
  </select>
```

**Important** For this rule to work, the default value or option MUST be placed in the `title` attribute.

### Email

```html
  <input class="email" id="email" title="Your Email" type="text" value="Your Email" />
```

### Telephone

```html
  <input class="phone" id="phone" title="Your Phone Number" type="text" value="Your Phone Number" />
```

Accepts spaces, dashes and points

### Number

```html
  <input class="number" id="price" title="Price" type="text" value="Price" />
```

Accepts spaces, dashes and points

### Integer

```html
  <input class="integer" id="price" title="Price" type="text" value="Price" />
```

Only digit.

### URL

```html
  <input class="url" id="Website" title="Website" type="text" value="Website" />
```

### Zipcode

```html
  <input class="zip" id="postcode" title="Postcode" type="text" value="Postcode" />
```

### At least one field required

Allows to specifiy that, in a set of fields, at least one is required.
All of the fields in the set must have the same `data-error-grouprequired` attribute.

```html
  <input class="grouprequired" id="areamin" title="Mininum Area" type="text" value="Minimum Area" data-error-grouprequired="area" data-error-fieldid="area_errors" />
  <input class="grouprequired" id="areamax" title="Maximum Area" type="text" value="Maximum Area" data-error-grouprequired="area" data-error-fieldid="area_errors" />
  <p id="area_errors" class="error-wrapper"></p>
```

The `data-error-fieldid` attribute is used to specify in which element the error message should be inserted.

### Values comparison : lower than ou greater than

Allows to specify that the value of the field must be lower or greater than the value of another field.
To indicate the other field, use the `data-error-{lowerthan or greaterthan}` attribute.

```html
  <input class="lowerthan" id="minprice" title="Minimum Price" type="text" value="Minimum Price" data-error-lowerthan="pricemax" data-error-fieldid="price_errors" />
  <input id="pricemax" title="Maximum Price" type="text" value="Maximum Price" />
  <p id="price_errors" class="error-wrapper"></p>
```

The `data-error-lowerthan` attribute is used to specify in which element the error message should be inserted.

## Error Handling

When a field fails at validating a rule, the `.error` class is added to it, and will be remove on the next click on the field.

### Default Error Messages

Each validation rule comes with a default error message:
- required : _The field {field title} is required._
- email: _Invalid email adress._
- phone: _Invalid phone number._
- url: _Invalid URL._
- number: _The field {field title} must be numeric._
- integer: _The field {field title} must be numeric._
- zip: _Invalid postcode._
- grouprequired: _At least one field required._
- lowerthan: _{field 1 title} must be lower than {field 2 title}._
- greaterthan: _{field 1 title} must be greater than {field 2 title}._

### Customize Error Messages

Two ways to customize error messages :
- **Modify the "field title" used in the message:** To change the field name used in the default message, use the `data-error-fieldname` attribute. 

```html
  <input class="required" id="name" title="Your name" type="text" value="Your name" data-error-fieldname="Name" />
```

Message : `The field <span class="fieldname">Name</span> is required.`

- **Specify a whole new message:** To completly change the error message associated to a validation rule of a field, add an attribute `data-error-message-{rule}` containing the desired message.

```html
  <input class="required" id="name" title="Your name" type="text" value="Your name" data-error-message-required="This field is required" />
```

Message : `This field is required`