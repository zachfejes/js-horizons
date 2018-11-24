const valueParse = "\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*"
const preEqualValues = "[A-Za-z\s\(\)\,0-9\^\-\+\/]*"

const datatypes = [
    {
        label: "Mean Radius",
        variations: [
            "Vol. Mean Radius",
            "Radius",
            "Mean Radius"
        ],
        units: "km",
        regex: /(?<!(Equ. |Equat. |Equatorial |Core |Polar |Pol. ))(Vol\. Mean |Mean )*Radius[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Equatorial Radius",
        variations: [
            "Equ. Radius",
            "Equat. radius",
            "Equatorial radius"
        ],
        units: "km",
        regex: /Equ(\.|at\.|atorial) Radius[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Polar Radius",
        variations: [
            "Polar radius"
        ],
        units: "km",
        regex: /Pol(\.|ar) Radius[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Density",
        variations: [
            "Density"
        ],
        units: "g/cm^3",
        regex: /Density [A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Mass",
        variations: [
            "Mass"
        ],
        units: "kg",
        regex: /Mass(?!( ratio| of))[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Volume",
        variations: [
            "Volume"
        ],
        units: "km^3",
        regex: /Volume[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Sidereal Rotational Period",
        variations: [
            "Sidereal rot. period",
            "Rotational period",
            "Sid. rot. period"
        ],
        units: "hr",
        regex: /(Sid(\.|ereal) rot\.|Rotational) period[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*([0-9\.\/x]+[\s]*[ydhms][\s])+/gi
    },
    {
        label: "Sidereal Rotational Rate",
        variations: [
            "Sid. Rot. Rate",
            "Rot. Rate"
        ],
        units: "rad/s",
        regex: /(Sid\. Rot\.|Rot.) Rate[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Sidereal Orbital Period",
        variations: [
            "Sidereal orb period",
            "Mean sidereal orb per",
            "Sidereal orb. per.",
            "Sidereal orbit period"
        ],
        units: "",
        regex: /(Mean )?Sidereal orb(\.|it)? per(iod|[\.])*[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*([0-9\.\/x]+[\s]*[ydhms][\s])+/gi
    },
    {
        label: "Orbital Period",
        variations: [
            "Orbital period",
            "Orbit period"
        ],
        units: "y",
        regex: /Orbit(al)? Period[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*([0-9\.\/x]+[\s]*[ydhms][\s])+/gi
    },
    {
        label: "Mean Sidereal Day",
        variations: [
            "Mean sidereal day"
        ],
        units: "hr",
        regex: /Mean Sidereal Day[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Mean Solar Day",
        variations: [
            "Mean solar day"
        ],
        units: "s",
        regex: /Mean Solar Day[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*([0-9\.\/x]+[\s]*[ydhms][\s])+/gi
    },
    {
        label: "Equatorial Gravity",
        variations: [
            "Equ. gravity",
            "Equ. grav",
            "g_e",
        ],
        units: "m/s^2",
        regex: /(Equ\. grav(ity)?|g\_e)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Polar Gravity",
        variations: [
            "Pol. gravity",
            "g_p",
            "Polar gravity",
            "Pol. grav"
        ],
        units: "m/s^2",
        regex: /(Pol(\.|ar) grav(ity)?|g\_p)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Orbital Gravity",
        variations: [
            "g_o"
        ],
        units: "m/s^2",
        regex: /g\_o[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Geometric Albedo",
        variations: [
            "Geometric Albedo"
        ],
        units: undefined,
        regex: /Geometric Albedo[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Potential Love",
        variations: [
            "Potential Love"
        ],
        units: undefined,
        regex: /Potential Love[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "GM",
        variations: [
            "GM"
        ],
        units: "km^3/s^2",
        regex: /(?<!(AN))GM(?!\s1\-sigma)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/g
    },
    {
        label: "GM 1-sigma",
        variations: [
            "GM 1-sigma"
        ],
        units: "km^3/s^2",
        regex: /GM 1\-sigma[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/g
    },
    {
        label: "Mass Ratio",
        variations: [
            "Mass ratio"
        ],
        units: undefined,
        regex: /Mass Ratio[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Atmospheric Pressure",
        variations: [
            "Atm. pressure",
            "Atmos. pressure"
        ],
        units: "bar",
        regex: /Atm(os)?\. Pressure[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Mass of Atmosphere",
        variations: [
            "Mass of atmosphere"
        ],
        units: "kg",
        regex: /Mass of Atmosphere[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[~]*[\s]*([0-9x\+\-\.\(\)\~\^]*(\s|$))*/gi
    },
    {
        label: "Maximum Angular Diameter",
        variations: [
            "Max. angular diam."
        ],
        units: "arcseconds",
        regex: /Max\. Angular Diam\.[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Mean Temperature",
        variations: [
            "Mean Temperature",
            "Mean effect. IR temp"
        ],
        units: "K",
        regex: /Mean (effect\. IR )?Temp(erature)?[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Visual Magnitude",
        variations: [
            "Visual mag.",
            "V(1,0)"
        ],
        units: "V(1,0)",
        regex: /(Visual mag\. )?V\(1\,0\)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Visual Magnitude (Opposition)",
        variations: [
            "Vis. mag. (opposition)"
        ],
        units: undefined,
        regex: /Vis\. mag\. \(opposition\)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Obliquity to Orbit",
        variations: [
            "Obliquity to orbit"
        ],
        units: "deg",
        regex: /Obliquity to Orbit[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Hill's Sphere Radius",
        variations: [
            "Hill's sphere rad."
        ],
        units: "Rp",
        regex: /Hill\'s Sphere Rad\.[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Orbit Speed",
        variations: [
            "Orbit speed",
            "Orbital speed",
            "Mean orbit speed"
        ],
        units: "km/s",
        regex: /(Mean )?Orbit(al)? Speed[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Escape Velocity",
        variations: [
            "Escape speed",
            "Escape velocity"
        ],
        units: "km/s",
        regex: /Escape (Speed|Velocity)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Solar Constant",
        variations: [
            "Solar Constant"
        ],
        units: "W/m^2",
        regex: /Solar Constant \(W\/m\^2\)[\s]+[0-9\.]+[\s]+[0-9\.]+[\s]+[0-9\.]+/gi
    },
    {
        label: "Maximum Planetary IR",
        variations: [
            "Maximum Planetary IR"
        ],
        units: "W/m^2",
        regex: /Maximum Planetary IR \(W\/m\^2\)[\s]+[0-9\.]+[\s]+[0-9\.]+[\s]+[0-9\.]+/gi
    },
    {
        label: "Minimum Planetary IR",
        variations: [
            "Minimum Planetary IR"
        ],
        units: "W/m^2",
        regex: /Minimum Planetary IR \(W\/m\^2\)[\s]+[0-9\.]+[\s]+[0-9\.]+[\s]+[0-9\.]+/gi
    },
    {
        label: "Polar Axis",
        variations: [
            "Polar axis"
        ],
        units: "km",
        regex: /Polar Axis[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Flattening",
        variations: [
            "Flattening"
        ],
        units: undefined,
        regex: /Flattening[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "J2",
        variations: [
            "J2"
        ],
        units: undefined,
        regex: /J2[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/g
    },
    {
        label: "Moment of Inertia",
        variations: [
            "Moment of inertia",
            "Mom. of Inertia"
        ],
        units: undefined,
        regex: /(Moment|Mom\.) of Inertia[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Core Radius",
        variations: [
            "Core radius"
        ],
        units: "km",
        regex: /Core Radius[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Fluid Core Radius",
        variations: [
            "Fluid core rad"
        ],
        units: "km",
        regex: /Fluid Core Rad[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Inner Core Radius",
        variations: [
            "Inner core rad"
        ],
        units: "km",
        regex: /Inner Core Rad[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Rocky Core Mass",
        variations: [
            "Rocky core mass"
        ],
        units: "Mc/M",
        regex: /Rocky core mass[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Atmospheric Temperature (1 bar)",
        variations: [
            "Atmos. temp. (1 bar)"
        ],
        units: "K",
        regex: /Atmos\. temp\. \(1 bar\)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Magnetic Moment",
        variations: [
            "Magnetic moment"
        ],
        units: "gauss",
        regex: /Magnetic Moment[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Mean Daily Motion",
        variations: [
            "Mean daily motion"
        ],
        units: "deg/d",
        regex: /Mean Daily Motion[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Semi-major Axis",
        variations: [
            "Semi-major axis",
            "A"
        ],
        units: "km",
        regex: /((?<!([A-Za-z]))A|Semi\-major Axis)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Eccentricity",
        variations: [
            "Eccentricity",
            "EC"
        ],
        units: undefined,
        regex: /(Eccentricity|EC)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Inclination",
        variations: [
            "Inclination",
            "IN"
        ],
        units: "deg",
        regex: /(IN|Inclination)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Roche Limit (Ice)",
        variations: [
            "A_roche(ice)/Rp"
        ],
        units: "1/Rp",
        regex: /A_roche\(ice\)\/Rp[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Epoch",
        variations: [
            "EPOCH",
            "JDTDB"
        ],
        units: "s",
        regex: /EPOCH\=[\s]*[0-9x\+\-\.\(\)\~\^]*(?=(\s\!))/gi
    },
    {
        label: "Perihelion Distance",
        variations: [
            "QR"
        ],
        units: "au",
        regex: /(?<!([A-Za-z]))QR\=[\s]*[0-9x\+\-\.\(\)\~\^]*/gi
    },
    {
        label: "Perihelion Julian Date",
        variations: [
            "TP"
        ],
        units: "s",
        regex: /(?<!([A-Za-z]))TP\=[\s]*[0-9x\+\-\.\(\)\~\^]*/
    },
    {
        label: "Longitude of the Ascending Node",
        variations: [
            "OM"
        ],
        units: "deg (w.r.t. ecliptic)",
        regex: /(?<!([A-Za-z]))OM\=[\s]*[0-9x\+\-\.\(\)\~\^]*/gi
    },
    {
        label: "Argument of Perihelion",
        variations: [
            "W"
        ],
        units: "deg (w.r.t. ecliptic)",
        regex: /(?<!([A-Za-z]))W\=[\s]*[0-9x\+\-\.\(\)\~\^]*/gi
    },
    {
        label: "Mean Anomaly",
        variations: [
            "MA"
        ],
        units: "degrees",
        regex: /(?<!([A-Za-z]))MA\=[\s]*[0-9x\+\-\.\(\)\~\^]*/gi
    },
    {
        label: "Mean Motion",
        variations: [
            "N"
        ],
        units: "deg/day",
        regex: /(?<!([A-Za-z]))N\=[\s]*[0-9x\+\-\.\(\)\~\^]*/gi
    }
]

module.exports = {
    valueParse,
    preEqualValues,
    datatypes
}