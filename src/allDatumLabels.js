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
        regex: /(?<!(Equ. |Equatorial |Core ))(Vol\. Mean |Mean )*Radius[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Equatorial Radius",
        variations: [
            "Equ. Radius",
            "Equatorial radius"
        ],
        units: "km",
        regex: /Equ(\.|atorial) Radius[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
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
            "Rotational period"
        ],
        units: "hr",
        regex: /(Sidereal rot\.|Rotational) period[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
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
            "Sidereal orb. per."
        ],
        units: "",
        regex: /(Mean )?Sidereal orb[\.]? per(iod|[\.])*[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Orbital Period",
        variations: [
            "Orbital period"
        ],
        units: "y",
        regex: /Orbital Period[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
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
        regex: /Mean Solar Day[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Equatorial Gravity",
        variations: [
            "Equ. gravity",
            "g_e"
        ],
        units: "m/s^2",
        regex: /(Equ\. gravity|g\_e)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Polar Gravity",
        variations: [
            "Pol. gravity",
            "g_p",
            "Polar gravity"
        ],
        units: "m/s^2",
        regex: /(Pol(\.|ar) gravity|g\_p)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
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
        regex: /GM(?!\s1\-sigma)[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/g
    },
    {
        label: "GM 1-sigma",
        variations: [
            "GM 1-sigma"
        ],
        units: "km^3/s^2",
        regex: /GM 1\-sigma[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/g
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
        regex: /Mass of Atmosphere[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
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
        units: undefined,
        regex: /Hill\'s Sphere Rad\.[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Orbit Speed",
        variations: [
            "Orbit speed",
            "Orbital speed"
        ],
        units: "km/s",
        regex: /Orbit(al)? Speed[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
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
        regex: /Solar Constant \(W\/m\^2\)[\s]+[0-9]+[\s]+[0-9]+[\s]+[0-9]+/gi
    },
    {
        label: "Maximum Planetary IR",
        variations: [
            "Maximum Planetary IR"
        ],
        units: "W/m^2",
        regex: /Maximum Planetary IR \(W\/m\^2\)[\s]+[0-9]+[\s]+[0-9]+[\s]+[0-9]+/gi
    },
    {
        label: "Minimum Planetary IR",
        variations: [
            "Minimum Planetary IR"
        ],
        units: "W/m^2",
        regex: /Minimum Planetary IR \(W\/m\^2\)[\s]+[0-9]+[\s]+[0-9]+[\s]+[0-9]+/gi
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
            "Semi-major axis"
        ],
        units: "km",
        regex: /Semi\-major Axis[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Eccentricity",
        variations: [
            "Eccentricity"
        ],
        units: undefined,
        regex: /Eccentricity[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    },
    {
        label: "Inclination",
        variations: [
            "Inclination"
        ],
        units: "deg",
        regex: /Inclination[A-Za-z\s\(\)\,0-9\^\-\+\/]*\=[\s]*[0-9x\+\-\.\(\)\~\^]*([\s]*\+\-[\s]*[0-9\+\-\.\(\)\~\^]*)*/gi
    }
]

module.exports = {
    valueParse,
    preEqualValues,
    datatypes
}