const fs = require('fs');

try {
    let content = fs.readFileSync('src/components/AdminPanel.svelte', 'utf-8');

    // Fix labels
    content = content.replace(
        /<label class="([^"]*)">\s*Email\s*<\/label\s*>\s*<input\s+type="email"/g,
        '<label for="email" class="$1">Email</label>\n            <input id="email" type="email"'
    );
    content = content.replace(
        /<label class="([^"]*)">\s*Password\s*<\/label\s*>\s*<input\s+type="password"/g,
        '<label for="password" class="$1">Password</label>\n            <input id="password" type="password"'
    );

    const labelMappings = {
        "Event name": "event-name",
        "Description": "event-desc",
        "Event image": "event-image",
        "Home team": "home-team",
        "Away team": "away-team",
        "Home logo URL": "home-logo",
        "Away logo URL": "away-logo",
        "Match image": "match-image",
        "Datetime": "match-datetime",
        "Venue": "match-venue",
        "Tournament": "match-tournament",
        "Status": "match-status",
        "Score": "match-score",
        "Phase": "match-phase",
        "Title": "article-title",
        "Category": "article-category",
        "Read time": "article-readtime",
        "Header image": "article-image"
    };

    for (const [labelText, idAttr] of Object.entries(labelMappings)) {
        // match <label ... > \s* LabelText \s* </label \s*> \s* <input|select|textarea ...
        const patternStr = '(<label[^>]*)(>)\\s*' + labelText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\s*</label\\s*>(\\s*<(?:input|select|textarea)[^>]*?)';
        const pattern = new RegExp(patternStr, 'gi');
        
        content = content.replace(pattern, (match, p1, p2, p3) => {
            if (p1.includes('for=')) {
                return match;
            }
            // preserve the multiline nature or just format it on one line, doesn't matter
            const labelStart = `${p1} for="${idAttr}">${labelText}</label>`;
            
            let inputStart = p3;
            if (inputStart.includes('<input')) {
                inputStart = inputStart.replace('<input', `<input id="${idAttr}"`);
            } else if (inputStart.includes('<select')) {
                inputStart = inputStart.replace('<select', `<select id="${idAttr}"`);
            } else if (inputStart.includes('<textarea')) {
                inputStart = inputStart.replace('<textarea', `<textarea id="${idAttr}"`);
            }
            
            return labelStart + inputStart;
        });
    }

    // Fix Email and Password separately since they might have multiline tags too
    content = content.replace(
        /(<label[^>]*)(>)\s*Email\s*<\/label\s*>(\s*<input[^>]*?type="email")/g,
        (match, p1, p2, p3) => {
            if (p1.includes('for=')) return match;
            return `${p1} for="email">${p2}Email</label>${p3.replace('<input', '<input id="email"')}`;
        }
    );
    content = content.replace(
        /(<label[^>]*)(>)\s*Password\s*<\/label\s*>(\s*<input[^>]*?type="password")/g,
        (match, p1, p2, p3) => {
            if (p1.includes('for=')) return match;
            return `${p1} for="password">${p2}Password</label>${p3.replace('<input', '<input id="password"')}`;
        }
    );

    fs.writeFileSync('src/components/AdminPanel.svelte', content, 'utf-8');
    console.log('Successfully updated AdminPanel.svelte');
} catch (error) {
    console.error('Error:', error);
    process.exit(1);
}
