Feature: SAM1 Action
  As a Farmer
  I want to be able to apply funding for SAM1 using Rural Payments Service

  Scenario: Sarah applies for Land Parcel which is Arable and land use is spring wheat(AC32)
     Given Sarah is on the Rural Payments Service login page
     When Sarah is eligible to apply for funding
     And Sarah selects the land parcel type of Arable
     Then she chooses to apply for SAM1 for 8.4 hectares
     And Sarah is shown 143.72 she will receive for this SAM1

  Scenario: Sarah applies for Land Parcel which is Permanent Grassland and use is Permanent Grassland(PG01)
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland
    Then she chooses to apply for SAM1 for 4.2 hectares
    And Sarah is shown 119.36 she will receive for this SAM1

  Scenario: Jim applies for Land Parcel where there is an existing agreement in place
    Given Jim is on the Rural Payments Service login page
    When Jim is eligible to apply for funding
    And Jim selects the land parcel type of Arable
    Then he chooses to apply for SAM1 for 20 hectares
    And Jim is shown 211.00 she will receive for this SAM1