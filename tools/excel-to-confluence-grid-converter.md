---
layout: tool
title: Excel to Confluence grid converter
comments: false
toc: false
editurl: tools/excel-to-confluence-grid-converter.md
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
  <label>With header</label>
  <input type="checkbox" id="header">
</div>
<div>
  <button id="convert">Convert</button>
</div>

<script type="text/javascript">
  function convert(input, includeHeader) {
    var rows = input.split('\n');
    var out = rows.map(function(row, index) {
    	var separator = includeHeader && index === 0 ? '||' : '|'
      return separator + row.replace(/\t/g, separator) + separator;
    });
    return out.join('\n');
  }

  $('#convert').click(function() {
      var input = $('#from').val(),
        includeHeader = $('#header').is(':checked');
      $('#to').val(convert(input, includeHeader));
      console.log("inc", includeHeader);
    }
  )

</script>

<style>
  #from, #to{
    width: 100%;
    min-height: 400px;
  }
</style>
