# Space Station Wave Defence App MVP

## MVP Overview

- MERN stack program. Create web api to store, retrive and authenticate user data and game save states.

- Player defends stationary space station from waves of enemies to compete on leaderboards for high score.

- Each wave of enemies gets more difficult. More enemies, more health, higher damage?

- Upgrade system 
    - Low value drops from small enemies. Higher value from elite and boss enemies.
    - players may spend a percentage of currency earned from destroying enemies to get persistent upgrades for station and ship between playthroughs. Possibly sperate currency altogether.

## MPV Objectives

- Login and user registration page

- Leaderboard (persistent in DB)
    - Difficulty based leaderboards

- Alert for game objective

- Scoring
    - Time survived
    - Items collected
    - Enemies killed

- Ememies 
    - Basic enemy that shoots and moves slowly
    - Elite recolored larger enemies for more score 
    - Enemy that sticks to player and drains health

- Enemy drops
    - Repair kits
    - Currency
    - Parts/ Weapons 

- Upgrade tiers (persistent and per run) (Wishlist = W)
    - User uses currency or EXP to upgrade user profile
    - Health/ shield - station health/ shield 
    - Boost
    - Acceleration/ max speed
    - Weapons/ drones
        - Bullet spread
        - Rate of fire
        - Space flail
        - Item grabber drone
        - Missile (limited ammo, upgradable storage)
            - Upgradeable/ damage/ range/ radius/ tracking
        - Repair speed/ shield recharge
        - Special abilities 
        
- User auth keys

## WISHLIST for Further Dev

- Outside Game
    - Achievements: List of enemies met/ killed
    - Customizeable user profiles

- In Game    
    - Different game modes
    - Tutorial 
    - Boss fights
    - Record custom sounds and soundtrack