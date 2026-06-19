<?php
/* ============================================================
 *  COOKIE MANAGER — PHP Demo
 *  Functions: create, delete, check cookie
 *  Note: setcookie() works on the NEXT request, not current one
 * ============================================================ */


/**
 * CREATE COOKIE
 * Sets "username1" cookie valid for 1 hour (3600 seconds).
 * Important: $_COOKIE['username1'] will NOT be available in
 * this same request — it appears on the next page load.
 */
function create_cookie() {
    setcookie("username1", "Faizan", time() + 3600);
    return "✓ Cookie Created Successfully! Value: Faizan";
}


/**
 * DELETE COOKIE
 * To delete a cookie, we set its expiry time in the PAST.
 * time() - 3600 means 1 hour ago → browser removes it.
 */
function delete_cookie() {
    setcookie("username1", "", time() - 3600);
    return "✓ Cookie Deleted Successfully";
}


/**
 * CHECK COOKIE
 * isset() checks if the cookie key exists in the $_COOKIE array.
 * Returns a message whether cookie is found or not.
 */
function check_cookie() {
    if (isset($_COOKIE['username1'])) {
        return "✓ Cookie is available → Value: " . $_COOKIE['username1'];
    } else {
        return "✗ Cookie is NOT available — try creating it first";
    }
}


/* ============================================================
 * HANDLE FORM SUBMISSION (POST Request)
 * Buttons submit this form via POST method.
 * We check which button was clicked using $_POST keys.
 * ============================================================ */
$result = ""; // Default: no message

if (isset($_POST['create_cookie'])) {
    $result = create_cookie();

} elseif (isset($_POST['delete_cookie'])) {
    $result = delete_cookie();

} elseif (isset($_POST['check_cookie'])) {
    $result = check_cookie();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie Manager</title>

    <!-- Google Fonts: Inter for clean modern look -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <style>
        /* ── Reset ─────────────────────────────────────── */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* ── Color Tokens (White + Green Minimal) ──────── */
        :root {
            --white:       #ffffff;
            --off-white:   #f7faf8;
            --green-100:   #e8f5ee;
            --green-300:   #6fcf97;
            --green-500:   #27ae60;
            --green-700:   #1a7a42;
            --text-dark:   #0d1f16;
            --text-soft:   #7a9885;
            --border:      #d4e8db;
            --code-bg:     #f0f7f3;
        }

        /* ── Base Layout ────────────────────────────────── */
        body {
            font-family: 'Inter', sans-serif;
            background: var(--off-white);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px 16px;
        }

        /* ── Card Container ─────────────────────────────── */
        .card {
            background: var(--white);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 40px;
            max-width: 520px;
            width: 100%;
            box-shadow: 0 4px 24px rgba(39, 174, 96, 0.08);
        }

        /* ── Card Header ─────────────────────────────────── */
        .card-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 6px;
        }

        .card-icon {
            width: 44px;
            height: 44px;
            background: var(--green-100);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
        }

        h1 {
            font-size: 22px;
            font-weight: 600;
            color: var(--text-dark);
            letter-spacing: -0.4px;
        }

        .subtitle {
            color: var(--text-soft);
            font-size: 13px;
            margin-left: 58px;
            margin-bottom: 28px;
        }

        /* ── Divider ─────────────────────────────────────── */
        .divider {
            height: 1px;
            background: var(--border);
            margin-bottom: 28px;
        }

        /* ── Buttons ─────────────────────────────────────── */
        /* 
         * All buttons are type="submit" inside a form.
         * Each has a unique name — PHP reads $_POST[name] to
         * identify which button was clicked.
         */
        form {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        button {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 18px;
            border: 1.5px solid var(--border);
            border-radius: 12px;
            background: var(--white);
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-dark);
            transition: all 0.18s ease;
            text-align: left;
            width: 100%;
        }

        button:hover {
            border-color: var(--green-500);
            background: var(--green-100);
            color: var(--green-700);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.15);
        }

        .btn-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: var(--green-100);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            flex-shrink: 0;
        }

        button:hover .btn-icon {
            background: var(--green-300);
        }

        .btn-label {
            flex: 1;
        }

        .btn-hint {
            display: block;
            font-size: 11.5px;
            font-weight: 400;
            color: var(--text-soft);
            font-family: 'JetBrains Mono', monospace;
            margin-top: 2px;
        }

        /* ── Result Display Box ───────────────────────────── */
        /*
         * This div shows the PHP function's return value.
         * Only visible when $result is not empty.
         */
        .result-box {
            margin-top: 24px;
            padding: 14px 18px;
            background: var(--code-bg);
            border: 1px solid var(--border);
            border-left: 3px solid var(--green-500);
            border-radius: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: var(--green-700);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .result-dot {
            width: 8px;
            height: 8px;
            background: var(--green-500);
            border-radius: 50%;
            flex-shrink: 0;
        }
    </style>
</head>
<body>

<div class="card">

    <!-- Card Header -->
    <div class="card-header">
        <div class="card-icon">🍪</div>
        <h1>Cookie Manager</h1>
    </div>
    <p class="subtitle">PHP Cookie Lifecycle Demo</p>

    <div class="divider"></div>

    <!--
     * FORM — method="POST" required for $_POST to work.
     * Without this form tag, buttons do nothing in PHP.
     * action="" means submit to the same file (self).
    -->
    <form method="POST" action="">

        <!-- Button 1: Create Cookie -->
        <button type="submit" name="create_cookie">
            <div class="btn-icon">➕</div>
            <div class="btn-label">
                Create Cookie
                <span class="btn-hint">setcookie("username1", "Faizan", time() + 3600)</span>
            </div>
        </button>

        <!-- Button 2: Check Cookie -->
        <button type="submit" name="check_cookie">
            <div class="btn-icon">🔍</div>
            <div class="btn-label">
                Check Cookie
                <span class="btn-hint">isset($_COOKIE['username1'])</span>
            </div>
        </button>

        <!-- Button 3: Delete Cookie -->
        <button type="submit" name="delete_cookie">
            <div class="btn-icon">🗑️</div>
            <div class="btn-label">
                Delete Cookie
                <span class="btn-hint">setcookie("username1", "", time() - 3600)</span>
            </div>
        </button>

    </form>

    <!--
     * Result Box — only shown when a button was clicked.
     * PHP echoes the return value of the called function here.
    -->
    <?php if (!empty($result)) : ?>
        <div class="result-box">
            <div class="result-dot"></div>
            <span><?php echo htmlspecialchars($result); ?></span>
        </div>
    <?php endif; ?>

</div>

</body>
</html>