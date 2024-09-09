---
title: Power Apps
---

A platform for building custom applications without extensive coding knowledge. Users can create apps that run on web and mobile devices, integrating with various data sources.

# Case Study: Mapper

![Resize](/docs/notes/development/power_platform/assets/app1.png)

## Main List

```groovy
Sort(
        Filter(
                AddColumns(
                        'Case Studies',
                        Kimbles,
                        Concat(
                                Engagements,
                                Value,
                                ","
                        ),
                        DMs,
                        Concat(
                                DM,
                                Value,
                                ","
                        ),
                        Owners,
                        Concat(
                                Owner,
                                Value,
                                ","
                        )
                ),
                (TextInputCanvas1.Value in Title || TextInputCanvas1.Value in Kimbles || TextInputCanvas1.Value in DMs || TextInputCanvas1.Value in Owners) && (!Toggle2.Checked || CountRows(Engagements) = 0)
        ),
        Title
)
```

## Mapped items

```groovy
With(
        {
            mappedEngagements: ForAll(
                    varCaseStudySelected.Engagements,
                    LookUp(
                            Engagements,
                            ID = Id
                    )
            )
        },
        Sort(
                AddColumns(
                        Filter(
                                mappedEngagements,
                                TextInputCanvas1_1.Value in Title || TextInputCanvas1_1.Value in DM || TextInputCanvas1_1.Value in Owner
                        ),
                        'IsMapped',
                        true
                ),
                Title
        )
)
```

## Unmapped Items

```groovy
AddColumns(
        Sort(
                Filter(
                        Engagements,
                        (TextInputCanvas1_2.Value in Title || TextInputCanvas1_2.Value in DM || TextInputCanvas1_2.Value in Owner) && (!Toggle1.Checked || Not(ID in allMappedEngagementIds)) && Not (ID in mappedEngagementIds)
                ),
                Title
        ),
        'IsMapped',
        ID in allMappedEngagementIds
)
```
