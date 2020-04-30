<h1>The First HTML, SCSS, and JS Framework for Government in Taiwan</h1>
#Hyweb UI kit 說明官方文件：http://design.hyweb.com.tw/hyui/

<h2>HyUI kit簡介</h2>
<p>因應提升政府網站服務品質，瀏覽器版本更新和根據國人行動載具普及化的現象，並配合國發會政府網站版型與內容管理規範，以及國家通訊傳播委員會頒布之無障礙網頁開發規範，凌網設計團隊開發此HyUI kit前端框架。 期望在政府網站設計的前端視覺互動、快速建置、網頁效能上獲得大幅的改善。 在視覺設計上的部分，以「使用者體驗」(User Experience)出發， 針對介面操作體驗的友善性、流暢的視覺動線、文字的閱讀舒適性，和色彩管理計畫皆有預設設定，且適用於所有載具的瀏覽呈現，期望本框架能全面提升政府網站的設計品質服務，並給予政府機關單位及民眾有更好的使用者體驗。</p>
<h2>HyUI kit特點：</h2>
<ul>
  <li>重視使用者體驗，打造簡潔易用的視覺介面</li>
  <li>以政府網站服務管理規範為設計參考原則</li>
  <li>支持響應式網頁設計(Responsive Web Design)​。</li>
  <li>支持國家通訊傳播委員會無障礙網頁開發規範A及2A版本。</li>
  <li>適用於所有前端開發類型，包括入口網站、應用系統、APP等。</li>
  <li>輕鬆通過W3C標準規範檢測。</li>
  <li>已設定網頁基礎優化(SEO)</li>
</ul>
<h2>適用對象</h2>
<p>適用於具備<a href="https://sass-lang.com/" target="_blank">SCSS</a>及<a href="https://jquery.com/" target="_blank">jQuery</a>編寫能力之網頁開發者，例如：前端工程師、網頁設計師，UI/UX設計師。</p>
<h2>如果要開發政府網站需預先理解</h2>
<p>HyUI不限制於開發政府網站，可用此框架開發任何您想要開發的網站或產品，但如果需要開發政府之資訊服務的話，建議需對以下資料先理解：</p>
<ul>
  <li><a href="https://www.webguide.nat.gov.tw/default.aspx">政府網站營運交流平台</a></li>
  <li><a href="https://www.handicap-free.nat.gov.tw/Accessible/Category/7/1">無障礙網頁開發規範</a></li>
</ul>
<h2>適用瀏覽器版本</h2>
<p>預設支援Mac與Windows每種主要平台預設瀏覽器的最新版本，當然！也包括Android及iOS上的以下瀏覽器。因為使用CSS3技術，因此版本最低可支援到<strong>Internet Explorer 9</strong>，但仍有部分CSS3因IE9不完全支援或其全部功能需要前輟屬性而出現錯誤，開發人員如有疑慮可參考<a href="http://caniuse.com/">CAN I USE</a>網站查詢屬性。(N/A：代表該平台無此瀏覽器)</p>
<div class="demo_table">
                <table>
                    <thead>
                        <tr><th></th>
                        <th><img src="http://design.hyweb.com.tw/hyui/images/icon_ie_old.png" alt=""><span>IE7,8</span></th>
                        <th><img src="http://design.hyweb.com.tw/hyui/images/icon_ie.png" alt=""> <span>IE9+</span></th>
                        <th><img src="http://design.hyweb.com.tw/hyui/images/icon_edge.jpg" alt=""> <span>Edge</span></th>
                        <th><img src="http://design.hyweb.com.tw/hyui/images/icon_firefox.png" alt=""><span>Firefox</span></th>
                        <th><img src="http://design.hyweb.com.tw/hyui/images/icon_chrome.png" alt=""><span>Chrome</span></th>
                        <th><img src="http://design.hyweb.com.tw/hyui/images/icon_safari.png" alt=""> <span>Safari</span></th>
                    </tr></thead>
                    <tbody>
                        <tr>
                            <td>Windows</td>
                            <td>不支援</td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td>不支援</td>
                        </tr>
                        <tr>
                            <td>MAC OS</td>
                            <td><span class="gray">N/A</span></td>
                            <td><span class="gray">N/A</span></td>
                            <td><span class="gray">N/A</span></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                        </tr>
                        <tr>
                            <td>Android</td>
                            <td><span class="gray">N/A</span></td>
                            <td><span class="gray">N/A</span></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><span class="gray">N/A</span></td>
                        </tr>
                        <tr>
                            <td>iOS</td>
                            <td><span class="gray">N/A</span></td>
                            <td><span class="gray">N/A</span></td>
                            <td><span class="gray">N/A</span></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                            <td><img src="http://design.hyweb.com.tw/hyui/images/icon_ok.png" alt=""></td>
                        </tr>
                    </tbody>
                </table>
            </div>
                            
<br/>
<br/>
<h2>特別感謝</h2>
<p>感謝<a href="https://www.hyweb.com.tw/">凌網科技 hyweb technology co. Ltd</a>協助與支持本框架開發的可愛夥伴們。</p>
