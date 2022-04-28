import React from "react";
import decode from 'jwt-decode';
// hello

const shopPage = () => {

  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.remove()
  }

    return (
      <>
        <div className="shopBG"></div>

        <div className="topPanel">
          <h1 className="shopHeader">Shop</h1>

          <div className="currencySection">
            <div className="currencyH1">Currency: </div>
            <div className="currency">0 MM</div>
          </div>
        </div>

        <div className="shopPanelHolder">
          <div className="shipPanel">
            <h1 className="shipHeader">Ship</h1>

            <div className="shopColumn shipColumn1">
              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipUpgrade">
                <div className="upgradeSmallIcon"></div>
                <div className="upgradeInfoSurround">
                  <div className="upgradeInfo">
                    <div className="upgradeName">Upgrade</div>
                    <div className="upgradeBasicDesc">
                      Details about the upgrade will go inside this box.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shopColumn shipColumn2"></div>
          </div>

          <div className="stationPanel">
            <h1 className="stationHeader">Station</h1>

            <div className="shopColumn stationColumn1">

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

                <div className="shipUpgrade">
                    <div className="upgradeSmallIcon"></div>
                    <div className="upgradeInfoSurround">
                    <div className="upgradeInfo">
                        <div className="upgradeName">Upgrade</div>
                        <div className="upgradeBasicDesc">
                        Details about the upgrade will go inside this box.
                        </div>
                    </div>
                    </div>
                </div>

            </div>

            <div className="shopColumn stationColumn2"></div>
          </div>
        </div>
      </>
    );
  }
  export default shopPage;
