---
title: Power Apps
---

A platform for building custom applications without extensive coding knowledge. Users can create apps that run on web and mobile devices, integrating with various data sources.

# Case Study: Mapper

![Resize](/docs/notes/development/power_platform/assets/app1.png)

## Mapped items

```groovy
Sort(
    Filter(
        ForAll(
            varCaseStudySelected.Engagements,
            LookUp(
                Engagements,
                ID = Id
            )
        ),
        TextInputCanvas1_1.Value in Title
    ),
    Title
)
```

## Unmapped Items

```groovy
Sort(
        Filter(
                Engagements,
                TextInputCanvas1_2.Value in Title && (!Toggle1.Checked || Not(ID in allMappedEngagementIds)) && Not (ID in ForAll(
                        varCaseStudySelected.Engagements,
                        Id
                ))
        ),
        Title
)
```
