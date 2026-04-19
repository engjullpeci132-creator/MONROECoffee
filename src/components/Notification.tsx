<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Mode Notice</title>
    <style>
        /* Simple clean styling for the overlay and modal */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        /* Dark overlay background */
        #popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        /* The popup box itself */
        .popup-box {
            background: white;
            max-width: 450px;
            width: 90%;
            padding: 30px 25px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
            animation: fadeSlide 0.3s ease-out;
            border-top: 6px solid #ff6b35;
        }

        @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .popup-box h2 {
            margin-top: 0;
            color: #222;
            font-weight: 600;
            letter-spacing: 1px;
        }

        .popup-box p {
            font-size: 18px;
            color: #444;
            margin: 20px 0 15px;
            line-height: 1.5;
        }

        .popup-box .highlight {
            font-weight: bold;
            color: #0d6efd;
            background: #eef4ff;
            padding: 5px 10px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 5px;
        }

        .close-btn {
            background: #0d6efd;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 40px;
            cursor: pointer;
            margin-top: 15px;
            transition: background 0.2s, transform 0.1s;
            box-shadow: 0 4px 10px rgba(13, 110, 253, 0.3);
        }

        .close-btn:hover {
            background: #0b5ed7;
        }

        .close-btn:active {
            transform: scale(0.97);
        }

        .demo-watermark {
            margin-top: 20px;
            font-size: 13px;
            color: #888;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }

        /* Main content hidden behind popup (just for demo context) */
        .page-content {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>

    <!-- POPUP OVERLAY - This will show on page load -->
    <div id="popup-overlay">
        <div class="popup-box">
            <h2>🔔 DEMO MODE</h2>
            <p>
                You are viewing a limited demonstration.<br>
                <span class="highlight">For full functional website system,<br>visit <strong>vizionidigjital.com</strong></span>
            </p>
            <button class="close-btn" id="closePopupBtn">Got it, Close</button>
            <div class="demo-watermark">✨ Demo Version — Some features disabled</div>
        </div>
    </div>

    <!-- EXAMPLE PAGE CONTENT (This represents the rest of your site) -->
    <div class="page-content">
        <h1>🌐 Your Website Content</h1>
        <p>This is the main page content that will be visible after closing the popup.</p>
        <p>Status: <span style="color: #dc3545;">Demo Mode Active</span></p>
    </div>

    <script>
        // Simple JavaScript to hide the popup when the button is clicked
        document.addEventListener('DOMContentLoaded', function() {
            const overlay = document.getElementById('popup-overlay');
            const closeBtn = document.getElementById('closePopupBtn');

            // Close popup when clicking the button
            closeBtn.addEventListener('click', function() {
                overlay.style.display = 'none';
            });

            // Optional: Click outside the box (on the dark overlay) to close
            overlay.addEventListener('click', function(e) {
                // If the click target is the overlay itself (not the inner box)
                if (e.target === overlay) {
                    overlay.style.display = 'none';
                }
            });
        });
    </script>

</body>
</html>
