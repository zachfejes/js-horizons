const parseTests = [
    {
        rawData: `[?1h=
            *******************************************************************************
            Revised: July 31, 2013                 Venus                           299 / 2
            
            PHYSICAL DATA (updated 2018-Aug-15):
            Vol. Mean Radius (km) =  6051.84+-0.01 Density (g/cm^3)      =  5.204
            Mass x10^23 (kg)      =    48.685      Volume (x10^10 km^3)  = 92.843
            Sidereal rot. period  =   243.022498 d Sid. Rot. Rate (rad/s)= -0.00000029924
            Mean solar day        =   116.7490 d   Equ. gravity  m/s^2   =  8.870
            Mom. of Inertia       =     0.33       Core radius (km)      = ~3200
            Geometric Albedo      =     0.65       Potential Love # k2   = ~0.25
            GM (km^3/s^2)         = 324858.592     Equatorial Radius, Re = 6051.893 km
            GM 1-sigma (km^3/s^2) =    +-0.006     Mass ratio (Sun/Venus)= 408523.72
            Atmos. pressure (bar) =  90            Max. angular diam.    =   60.2"
            Mean Temperature (K)  = 735            Visual mag. V(1,0)    =   -4.40
            Obliquity to orbit    = 177.3 deg      Hill's sphere rad.,Rp =  167.1
            Sidereal orb. per., y =   0.61519726   Orbit speed, km/s     =   35.021
            Sidereal orb. per., d = 224.70079922   Escape speed, km/s    =   10.361
                                            Perihelion  Aphelion    Mean
            Solar Constant (W/m^2)         2759        2650        2614
            Maximum Planetary IR (W/m^2)    153         153         153
            Minimum Planetary IR (W/m^2)    153         153         153
            *******************************************************************************
            
            [K[?1l> Select ... [E]phemeris, [F]tp, [M]ail, [R]edisplay, ?, <cr>: `,
    },
    {
        rawData:     `[?1h=
            *******************************************************************************
             Revised: July 31, 2013                  Earth                              399
             
             GEOPHYSICAL PROPERTIES (revised Aug 15, 2018):
              Vol. Mean Radius (km)    = 6371.01+-0.02   Mass x10^24 (kg)= 5.97219+-0.0006
              Equ. radius, km          = 6378.137        Mass layers:
              Polar axis, km           = 6356.752          Atmos         = 5.1   x 10^18 kg
              Flattening               = 1/298.257223563   oceans        = 1.4   x 10^21 kg
              Density, g/cm^3          = 5.51              crust         = 2.6   x 10^22 kg
              J2 (IERS 2010)           = 0.00108262545     mantle        = 4.043 x 10^24 kg
              g_p, m/s^2  (polar)      = 9.8321863685      outer core    = 1.835 x 10^24 kg
              g_e, m/s^2  (equatorial) = 9.7803267715      inner core    = 9.675 x 10^22 kg
              g_o, m/s^2               = 9.82022         Fluid core rad  = 3480 km
              GM, km^3/s^2             = 398600.435436   Inner core rad  = 1215 km
              GM 1-sigma, km^3/s^2     =      0.0014     Escape velocity = 11.186 km/s
              Rot. Rate (rad/s)        = 0.00007292115   Surface area:
              Mean sidereal day, hr    = 23.9344695944     land          = 1.48 x 10^8 km
              Mean solar day 2000.0, s = 86400.002         sea           = 3.62 x 10^8 km
              Mean solar day 1820.0, s = 86400.0         Love no., k2    = 0.299
              Moment of inertia        = 0.3308          Atm. pressure   = 1.0 bar
              Mean temperature, K      = 270             Volume, km^3    = 1.08321 x 10^12
              Mean effect. IR temp, K  = 255             Magnetic moment = 0.61 gauss Rp^3
              Geometric albedo         = 0.367           Vis. mag. V(1,0)= -3.86
              Solar Constant (W/m^2)   = 1367.6 (mean), 1414 (perihelion), 1322 (aphelion)
             HELIOCENTRIC ORBIT CHARACTERISTICS:
              Obliquity to orbit, deg  = 23.4392911  Sidereal orb period  = 1.0000174 y
              Orbital speed, km/s      = 29.79       Sidereal orb period  = 365.25636 d
              Mean daily motion, deg/d = 0.9856474   Hill's sphere radius = 234.9       
            *******************************************************************************
            
            [K[?1l> Select ... [E]phemeris, [F]tp, [M]ail, [R]edisplay, ?, <cr>: `,
    },
    {
        rawData: `[?1h=
            *******************************************************************************
             Revised: June 21, 2016                 Mars                            499 / 4
             
             PHYSICAL DATA (updated 2018-Aug-15):
              Vol. mean radius (km) = 3389.92+-0.04   Density (g/cm^3)      =  3.933(5+-4)
              Mass x10^23 (kg)      =    6.4171       Flattening, f         =  1/169.779
              Volume (x10^10 km^3)  =   16.318        Semi-major axis       =  3396.2 
              Sidereal rot. period  =   24.622962 hr  Sid. rot. rate, rad/s =  0.0000708822 
              Mean solar day (sol)  =   88775.24415 s Polar gravity m/s^2   =  3.758
              Core radius (km)      = ~1700           Equ. gravity  m/s^2   =  3.71
              Geometric Albedo      =    0.150        Equatorial radius, Re = 3394.0 km                                       
              GM (km^3/s^2)         = 42828.375214    Mass ratio (Sun/Mars) = 3098703.59
              GM 1-sigma (km^3/s^2) = +- 0.00028      Mass of atmosphere, kg= ~ 2.5 x 10^16
              Mean temperature (K)  =  210            Atmos. pressure (bar) =    0.0056 
              Obliquity to orbit    =   25.19 deg     Max. angular diam.    =  17.9"
              Mean sidereal orb per =    1.88081578 y Visual mag. V(1,0)    =  -1.52
              Mean sidereal orb per =  686.98 d       Orbital speed,  km/s  =  24.13
              Hill's sphere rad. Rp =  319.8          Escape speed, km/s    =   5.027
                                             Perihelion  Aphelion    Mean
              Solar Constant (W/m^2)         717         493         589
              Maximum Planetary IR (W/m^2)   470         315         390
              Minimum Planetary IR (W/m^2)    30          30          30
            *******************************************************************************
            
            [K[?1l> Select ... [E]phemeris, [F]tp, [M]ail, [R]edisplay, ?, <cr>: `,
    },
    {
        rawData: `[?1h=
            *******************************************************************************
             Revised: Sep 29, 2017            Carme  / (Jupiter)                        511
            
             SATELLITE PHYSICAL PROPERTIES:
              Radius (km)             = 15              Density (g cm^-3)   =              
              Mass (10^20 kg )        =                 Geometric Albedo    =  
                                                        V(1,0)              = +11.3 
            
             SATELLITE ORBITAL DATA:
              Semi-major axis, a (km) = 22600 (10^3)    Orbital period      = 692 d (retro)
              Eccentricity, e         =   0.207         Rotational period   = 
              Inclination, i  (deg)   =  163            Local invar ref. pln= Sun
            *******************************************************************************
            
            [K[?1l> Select ... [E]phemeris, [F]tp, [M]ail, [R]edisplay, ?, <cr>: `,
    },
    {
        rawData: `[?1h=
            *******************************************************************************
             Revised: Oct 07, 2018            Enceladus / (Saturn)                      602
                                       http://ssd.jpl.nasa.gov/?sat_phys_par
                                         http://ssd.jpl.nasa.gov/?sat_elem
            
             SATELLITE PHYSICAL PROPERTIES:
              Mean Radius (km)        = 252.3   +- 0.6   Density (g/cm^3) =  1.606 +- 0.012
              Mass (10^19 kg)         =  10.805          Geometric Albedo =  1.04
              GM (km^3/s^2)           =   7.206 +- 0.011 V(1,0)           =  +2.2
            
             SATELLITE ORBITAL DATA (mean elements referred to local Laplace plane):
              Semi-major axis, a (km) = 238.04(10^3)    Orbital period    = 1.370218 d
              Eccentricity, e         = 0.0047          Rotational period = Synchronous
              Inclination, i  (deg)   = 0.009
            *******************************************************************************
            
            [K[?1l> Select ... [E]phemeris, [F]tp, [M]ail, [R]edisplay, ?, <cr>: `,
    },
    {
        rawData:  `[?1h=
            *******************************************************************************
             Revised: Oct 07, 2018              Titan / (Saturn)                        606
                                     http://ssd.jpl.nasa.gov/?sat_phys_par
                                       http://ssd.jpl.nasa.gov/?sat_elem
            
             SATELLITE PHYSICAL PROPERTIES:
              Mean Radius (km)       = 2575.5   +-  2.0  Density (g/cm^3) =  1.880 +- 0.004
              Mass (10^19 kg)        = 13455.3           Geometric Albedo =  0.2 
              GM (km^3/s^2)          = 8978.13  +-  0.06  V(1,0)          = -1.2 
            
             SATELLITE ORBITAL DATA:
              Semi-major axis, a (km)= 1221.87 (10^3)  Orbital period     = 15.945421 d
              Eccentricity, e        = 0.0288          Rotational period  = 
              Inclination, i  (deg)  = 0.28
            *******************************************************************************
            
            [K[?1l> Select ... [E]phemeris, [F]tp, [M]ail, [R]edisplay, ?, <cr>: `
    }
];