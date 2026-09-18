
const weatherform = document.querySelector(".weatherform")
const weatherinput = document.getElementById("weatherinput")
const carddisplay = document.querySelector(".card")
const apikey = "2bd4f95a737d89ea363fe59fa3b38f4a"

weatherform.addEventListener("submit", async (e) => {

    e.preventDefault()

    const city = weatherinput.value

    if (city) {
        try {
            const weatherdate = await getweatherdate(city)
            showweatherinfo(weatherdate)
            weatherinput.value=''
        } catch (error) {
            console.error(error)
            showerror(error)
            weatherinput.value=''
        }
    } else {
        showerror('please enter a city name !')
    }

});

async function getweatherdate(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    const data = await fetch(apiurl)
    if (!data.ok) {
        throw new Error("shaxar topilmadi")
    }
    return data.json()
};

function showweatherinfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data
    carddisplay.textContent = ''
    carddisplay.style.display = "flex"

    const citydisplay = document.createElement('p')
    citydisplay.textContent = city
    const degDisplay = document.createElement('p')
    degDisplay.textContent = `${Math.round(temp)}°C`
    const infodisplay = document.createElement('p')
    infodisplay.textContent = `Humidity: ${humidity}%`
    const descdisplay = document.createElement('p')
    descdisplay.textContent = description
    const emojidisplay = document.createElement('p')
    emojidisplay.textContent = getemoji(id)
    emojidisplay.style.fontSize = '3rem'
    carddisplay.append(citydisplay, emojidisplay, degDisplay, infodisplay, descdisplay)

};
function getemoji(id) {
    switch (true) {
        case id >= 200 && id < 300:
            return "⛈️"
        case id >= 300 && id < 400:
            return "🌦️"
        case id >= 500 && id < 600:
            return "🌧️"
        case id >= 600 && id < 700:
            return "❄️"
        case id >= 700 && id < 800:
            return "🌁"
        case id == 800:
            return "☀️"
        case id > 800:
            return "☁️"

        default:
            return "🌡️"
    }
};

function showerror(msg) {
    carddisplay.textContent = ''
    const errordisplay = document.createElement('p')
    errordisplay.textContent = msg
    carddisplay.style.display = "flex"
    carddisplay.appendChild(errordisplay)
}
