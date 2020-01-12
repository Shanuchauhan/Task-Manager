const {fahrenheitToCelsius,celsiusToFahrenheit}=require('../src/math.js')

test('Convert fahrenhiet to celsius degree',()=>{
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test('Convert fahrenhiet to celsius degree',()=>{
    expect(celsiusToFahrenheit(0)).toBe(32)
})

