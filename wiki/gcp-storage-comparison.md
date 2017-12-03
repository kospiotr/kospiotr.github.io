---
layout: wiki
title: Google Cloud Platform storage comparison
comments: false
toc: false
editurl: wiki/gcp-storage-comparison.md
---
* [Locations and products](https://cloud.google.com/about/locations/)
* [Storage compare](https://cloud.google.com/storage-options/)
* ![img](https://cloud.google.com/images/storage-options/flowchart.svg)

# Compare

<table>
<tbody>
<tr>
<td>Product</td>
<td>Characteristics</td>
<td>Use when</td>
<td>Avoid when</td>
</tr>
<tr>
<td>Persistent Disk</td>
<td>
<ul>
<li>Availibility: Zonal</li>
<li>Capacity:</li>
<li>Price</li>
<li>Transactional: no</li>
<li>Consistency: Strong</li>
</ul>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Storage</td>
<td>
<ul>
<li>Availibility: Multi Regional, Regional (*) zonal, however replicated across regions</li>
<li>Capacity: Unlimited</li>
<li>Price:&nbsp;Per usage
<ul>
<li>Regional $0.026</li>
<li>Nearline $0.01</li>
<li>Coldline $0.007&nbsp;</li>
</ul>
</li>
<li>Transactional: No</li>
<li>Consistency: Strong</li>
</ul>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Bigtable</td>
<td>&nbsp;
<ul>
<li>Availibility: Zonal</li>
<li>Capacity:&nbsp;</li>
<li>Unlimited</li>
<li>Price:&nbsp;$0.17 per GB/month</li>
<li>Transactional: No</li>
<li>Consistency: Eventual</li>
</ul>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Datastore</td>
<td>
<ul>
<li>Availibility: Fully managed: Global or Multiregional</li>
<li>Capacity: Unlimited</li>
<li>Price:</li>
<li>$0.18 per GB/month</li>
<li>Transactional: Yes</li>
<li>Consistency:&nbsp;</li>
<li>Strong for row, eventual for queries&nbsp;</li>
</ul></td>
<td>- Need to scale for read prformance<br />- Data is hierarchical with key/value&nbsp;</td>
<td>- Need strong support for transactions, use instead SQL or Spanner<br />- Need support non hierarchical or unstructured data, use instead BigTable or Storage<br />- Need analytics (OLAP) / BI / data warehousing, use instead BigQuery<br />- Need to store Blobs &gt; 10MB, use instead Storage<br />- Need to frequent reads and writes by key&nbsp;</td>
</tr>
<tr>
<td>Google Cloud SQL</td>
<td>
<ul>
<li>Availibility: Zonal</li>
<li>Capacity: Limited with storage</li>
<li>Price:</li>
<li>Transactional: Yes</li>
<li>Consistency: Strong</li>
</ul>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Spanner</td>
<td>
<ul>
<li>Availibility: Multi Regional</li>
<li>Capacity:&nbsp;</li>
<li>Price:</li>
<li>Transactional: Yes</li>
<li>Consistency: Strong</li>
</ul>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google BigQuery</td>
<td><ul>
<li>Availibility: Multi Regional</li>
<li>Capacity:</li>
<li>Price:</li>
<li>Transactional: No</li>
<li>Consistency: Eventual</li>
</ul>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
