from time import sleep
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.google.com')

sleep(2)

driver.quit()

