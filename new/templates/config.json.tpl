{
    "name":"{{name}}",
    "description":"This is the '{{name}}' plis generator ",{% if aliases|length > 0 %}
    "aliases":[{% for alias in aliases %}"{{alias}}"{% if forloop.Last %}{% else %},{% endif %}{% endfor %}],{% endif %}
    "script_type":"{{type}}"
}