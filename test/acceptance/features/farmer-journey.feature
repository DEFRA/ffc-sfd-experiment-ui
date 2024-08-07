Feature: Sarah the Farmer Journey
  As a Farmer
  I want to be able to apply for funding using Rural Payments Service


  Scenario: Sarah applies for Land Parcel which is Arable and land use is spring wheat(AC32)
     Given Sarah is on the Rural Payments Service login page
     When Sarah is eligible to apply for funding
     And Sarah selects the land parcel type of Arable land
     Then she can choose to apply for SAM1 and or SAM, but not LIG1
     And Sarah is shown amount she will receive for Arable land

  Scenario: Sarah applies for Land Parcel which is Permanent Grassland and use is Permanent Grassland(PG01)
    Given Sarah is on the Rural Payments Service login page
    When Sarah is eligible to apply for funding
    And Sarah selects the land parcel type of Permanent Grassland
    Then she can choose to apply for SAM1 and or LIG1, but not SAM2
    And Sarah is shown amount she will receive for Permanent Grassland

  Scenario: Jim applies for Land Parcel where there is an existing agreement in place
    Given Jim is on the Rural Payments Service login page
    When Jim is eligible to apply for funding
    And Jim selects the land parcel type of Arable land
    Then he can choose to apply for SAM1, but not SAM2, SAM3 or LIG1
    And Jim is shown amount she will receive for Arable land