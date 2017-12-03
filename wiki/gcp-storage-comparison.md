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
<p>Availibility: Zonal</p>
<p>Capacity:</p>
<p>Price</p>
<p>Transactional: no</p>
<p>Consistency: Strong</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Storage</td>
<td>
<p>Availibility: Multi Regional, Regional (*) zonal, however replicated across regions</p>
<p>Capacity: Unlimited</p>
<p>Price:&nbsp;Per usage -Regional $0.026 -Nearline $0.01 - Coldline $0.007&nbsp;</p>
<p>Transactional: No</p>
<p>Consistency: Strong</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Bigtable</td>
<td>&nbsp;
<p>Availibility: Zonal</p>
<p>Capacity:&nbsp;</p>
<p>Unlimited</p>
<p>Price:&nbsp;$0.17 per GB/month</p>
<p>Transactional: No</p>
<p>Consistency: Eventual</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Datastore</td>
<td>
<p>Availibility: Fully managed: Global or Multiregional</p>
<p>Capacity: Unlimited</p>
<p>Price:&nbsp;</p>
<p>$0.18 per GB/month</p>
<p>Transactional: Yes</p>
<p>Consistency:&nbsp;</p>
<p>Strong for row, eventual for queries&nbsp;</p>
&nbsp;</td>
<td>- Need to scale for read prformance<br />- Data is hierarchical with key/value&nbsp;</td>
<td>- Need strong support for transactions, use instead SQL or Spanner<br />- Need support non hierarchical or unstructured data, use instead BigTable or Storage<br />- Need analytics (OLAP) / BI / data warehousing, use instead BigQuery<br />- Need to store Blobs &gt; 10MB, use instead Storage<br />- Need to frequent reads and writes by key&nbsp;</td>
</tr>
<tr>
<td>Google Cloud SQL</td>
<td>
<p>Availibility: Zonal</p>
<p>Capacity: Limited with storage</p>
<p>Price:</p>
<p>Transactional: Yes</p>
<p>Consistency: Strong</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google Cloud Spanner</td>
<td>&nbsp;
<p>Availibility: Multi Regional</p>
<p>Capacity:&nbsp;</p>
<p>Price:</p>
<p>Transactional: Yes</p>
<p>Consistency: Strong</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Google BigQuery</td>
<td>&nbsp;
<p>Availibility: Multi Regional</p>
<p>Capacity:</p>
<p>Price</p>
<p>Transactional: No</p>
<p>Consistency: Eventual</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
