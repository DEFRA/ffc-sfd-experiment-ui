Feature: Sarah the Farmer Journey
  As a Farmer
  I want to be able to apply for funding using Rural Payments Service

  Scenario Outline: Sarah the Farmer applies funding for land parcel area of <value> and successfully receives <payment>
     Given Sarah is on the Rural Payments Service login page
     When Sarah is eligible to apply for funding
     And Sarah selects the land parcel and the quantity <value> she wants to apply for funding
     Then Sarah is shown <payment> amount she will receive

    Examples:
      | value | payment |
      | 2     | 258.00  |