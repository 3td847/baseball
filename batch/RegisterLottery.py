from time import sleep
from selenium import webdriver
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC

# ドライバ初期設定
driver = webdriver.Chrome()

# 基準URLにアクセス
driver.get('https://kouen.sports.metro.tokyo.lg.jp/web/')
sleep(2)

# ログイン処理
# ログイン画面に遷移
driver.find_element(By.ID, 'btn-login').click()
sleep(2)

# ログイン情報入力
driver.find_element(By.ID, 'userId').send_keys('userid')    # ユーザーIDを入力
driver.find_element(By.ID, 'password').send_keys('password')  # パスワードを入力

# ログインボタンをクリック
driver.find_element(By.ID, 'btn-go').click()
sleep(2)

# ナビゲーションバーから「抽選」をクリック
driver.find_elements(By.CLASS_NAME, 'nav-link')[2].click()
sleep(1)

# 「抽選申込み」をクリック
driver.find_elements(By.CLASS_NAME, 'modal-content')[2].find_elements(By.TAG_NAME, 'a')[0].click()
sleep(5)

# 野球を選択してクリック
driver.find_elements(By.CLASS_NAME, 'btn-primary')[0].click()
sleep(2)

Select(driver.find_element(By.ID, 'bname')).select_by_value('1001020')  # 砧公園を選択
driver.execute_script("$('#bname').trigger('change');")  # jQueryのchangeイベントを発火

sleep(5)

print(driver.find_element(By.ID, 'iname').text)  # 選択可能な施設名を出力

Select(driver.find_element(By.ID, 'iname')).select_by_visible_text('野球場')  # 野球場を選択
driver.execute_script("$('#iname').trigger('change');")  # jQueryのchangeイベントを発火

sleep(5)

driver.find_element(By.ID, 'usedate-table').find_elements(By.TAG_NAME, 'tr')[3].find_elements(By.TAG_NAME, 'td')[2].click()  # 2025年8月3日を選択
driver.find_element(By.ID, 'btn-go').click()

sleep(2)

select = Select(driver.find_element(By.ID, 'apply'))
select.select_by_index(1)  # 1枠目を選択
# driver.execute_script("document.getElementById('recaptchaToken').setAttribute('value', 'dummy')") # reCAPTCHAを無効化
# print(driver.execute_script('return gRecaptchaActive'))  # ブラウザのコンソールログを取得

sleep(10)

driver.find_element(By.ID, 'btn-go').click()

sleep(2)

Alert(driver).accept()  # 確認ダイアログを承認

sleep(5)

Alert(driver).accept()

sleep(5)

select = Select(driver.find_element(By.ID, 'apply'))
select.select_by_index(1)  # 1枠目を選択

sleep(15)

driver.find_element(By.ID, 'btn-go').click()

sleep(2)

Alert(driver).accept()  # 確認ダイアログを承認

sleep(5)

driver.quit()

