---
layout: tool
title: Excel to Confluence grid converter
comments: false
toc: false
editurl: tools/excel.md
---

<div>
  <label>From:</label>
  <textarea id="from"></textarea>
</div>
<div>
  <label>To:</label>
  <textarea id="to"></textarea>
</div>
<div>
  <button id="convert">Convert</button>
</div>

<script type="text/javascript">
  function convert(input) {
    var rows = input.split('\n');
    var out = rows.map(function(row) {
      return '|' + row.replace(/\t/g, "|") + '|'
    });
    return out.join('\n');
  }

  $('#convert').click(function() {
    $('#to').val(convert($('#from').val()));
  })
</script>

<style>
  #from, #to{
    width: 100%;
    min-height: 400px;
  }
</style>
